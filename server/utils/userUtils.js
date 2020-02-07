const axios = require('axios')
const User = require('../models/user')

//Get the users top artists and tracks
//Then create/save top matches
async function initializeUser(user) {


  user.isInitialized = true;
  return user.save()
}

//Asks Spotify for a new access token if it is expired (or will expire within the time buffer)
async function refreshAccessTokenIfNecessary(user) {
  const timeBuffer = 60 * 1000 //The amount of ms before expiration when the access token will be refreshed

  if (Date.now() > (user.tokenExpirationDate - timeBuffer)) {
    refreshAccessToken(user)
  }
}

async function refreshAccessToken(user) {
  const response = await this.post(apiRoutes.refreshTokenUrl, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
  })

  return response.accessToken
}

//Returns users who have the most artists/songs in common with user
function findMatches(user, resultCount) {
  const songWeight = 0.7 //Represents the fraction that the song matches make of an overall match percentage
  const artistWeight = 1 - songWeight
  const numArtists = user.topArtists.length
  const numSongs = user.topSongs.length

  return new Promise((resolve, reject) => {
    User.aggregate([
      { //Remove user from results
        $match: {
          _id: { $ne: user._id }
        }
      },
      { //Create arrays of common artist and song ids
        $project: {
          _id: 1,
          spotifyId: 1,
          displayName: 1,
          imageUrl: 1,
          commonArtists: { $setIntersection: [user.topArtists, '$topArtists'] },
          commonSongs: { $setIntersection: [user.topSongs, '$topSongs'] }
        }
      },
      { //Create fields with the number of common artists and songs
        $project: {
          _id: 1,
          spotifyId: true,
          displayName: 1,
          imageUrl: 1,
          commonArtists: true,
          commonSongs: true,
          commonArtistCount: { $size: '$commonArtists' },
          commonSongCount: { $size: '$commonSongs' }
        }
      },
      {
        $project: {
          _id: 1,
          spotifyId: true,
          displayName: 1,
          imageUrl: 1,
          commonArtists: true,
          commonSongs: true,
          commonArtistCount: true,
          commonSongCount: true,
          artistMatch: { $divide: ['$commonArtistCount', numSongs] },
          songMatch: { $divide: ['$commonSongCount', numArtists] },
        }
      },
      { //Create a field for the overall, weighted match
        $project: {
          _id: 1,
          spotifyId: 1,
          displayName: 1,
          imageUrl: 1,
          commonArtists: 1,
          commonSongs: 1,
          commonArtistCount: 1,
          commonSongCount: 1,
          songMatch: 1,
          artistMatch: 1,
          weightedMatch: {
            $add: [
              {
                $multiply: ['$artistMatch', artistWeight]
              },
              {
                $multiply: ['$songMatch', songWeight]
              }
            ]
          }
        }
      },
      {
        $sort: {
          weightedMatch: -1
        }
      },
      {
        $limit: resultCount
      },
      // { //Create a field "commonArtists" which contains information on each artist ---UNNECCESSARY
      //     $lookup:
      //     {
      //         from: "artists",
      //         localField: "common",
      //         foreignField: "_id",
      //         as: "commonArtists"
      //     }
      // }
    ]).then(function (matches) {
      resolve(matches)
    })
      .catch(function (err) {
        reject(err)
      })
  })
}

//Makes a request to spotify to get user's top artists.
//cb takes the form cb(err). Renture cb(null) if there was no error
async function populateTopArtists(user) {

  let requestConfig = {
    url: 'https://api.spotify.com/v1/me/top/artists',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + accessToken },
    responseType: 'json',
    params: {
      limit: 50,
      time_range: 'long_term'
    }
  }

  //Send a request to spotify for the user's top artists
  return axios.request(requestConfig)
    //Response successful
    .then(function (response) {

      let artistObjects = response.data.items
      let topArtists = new Array(artistObjects.length)

      artistObjects.forEach(function (artistObject, index) {
        topArtists[index] = artist.id
      })

      user.set('topArtists', topArtists)
      return user.save()
    })
    //Response Unsuccessful
    .catch(function (err) {
      cb(err);
    })
}

async function populateTopSongs(user) {

  let requestConfig = {
    url: 'https://api.spotify.com/v1/me/top/tracks',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + accessToken },
    responseType: 'json',
    params: {
      limit: 50,
      time_range: 'long_term'
    }
  }

  //Send a request to spotify for the user's top songs
  axios.request(requestConfig)
    //Response successful
    .then(function (response) {
      console.log(response.data.items)
      let songObjects = response.data.items
      let topSongs = new Array(songObjects.length)
      songObjects.forEach(function (songObject, index) {
        topSongs[index] = song.id
      })
      user.set('topSongs', topSongs)
      user.save()
    })
    //Response Unsuccessful
    .catch(function (error) {
      cb(error);
    })
}

module.exports = { initializeUser, refreshAccessTokenIfNecessary }