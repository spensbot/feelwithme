const User = require('../models/user')
const Match = require('../models/match')
const generateMatches = require('./generateMatches')

//Get the users top artists and tracks
//Then create/save top matches
async function initializeUser(user) {

  const matchCount = 10

  await deleteExistingMatches(user)

  const matches = await generateMatches(user, matchCount)

  await Match.insertMany(matches)

  user.isInitialized = true;
  return user.save()
}

//Makes a request to spotify to get user's top artists.
//cb takes the form cb(err). Renture cb(null) if there was no error
function populateTopArtists(user, accessToken, cb) {

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
  axios.request(requestConfig)
      //Response successful
      .then(function (response) {

          let artistObjects = response.data.items
          let topArtists = new Array(artistObjects.length)
          let completed = 0
          artistObjects.forEach(function (artistObject, index){
              Artist.findOne({spotifyId: artistObject.id}, function (err, artist) {
                  if (err) {
                      return cb(err)
                  } else if (artist){
                      topArtists[index] = artist.id
                      finished()
                  } else {
                      let newArtist = new Artist()
                      newArtist.mapSpotifyObject(artistObject)
                      newArtist.save(function(err, newArtist) {
                          if(err){
                              return cb(err);
                          } else {
                              topArtists[index] = newArtist.id
                              finished()
                          }
                      })
                  }
              })
          })

          function finished(){
              completed += 1
              if (completed === artistObjects.length) {
                  user.set('topArtists', topArtists)
                  user.save(function(err, user) {
                      if (err) {
                          cb(err)
                      } else {
                          cb(null)
                      }
                  })
              }
          }
      })
      //Response Unsuccessful
      .catch(function (err) {
          cb(err);
      })
}

function populateTopSongs(user, accessToken, cb) {

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
          let completed = 0
          songObjects.forEach(function (songObject, index){
              Song.findOne({spotifyId: songObject.id}, function (err, song) {
                  if (err) {
                      return cb(err)
                  } else if (song){
                      topSongs[index] = song.id
                      finished()
                  } else {
                      let newSong = new Song()
                      newSong.mapSpotifyObject(songObject)
                      newSong.save(function(err, newSong) {
                          if(err){
                              return cb(err)
                          } else {
                              topSongs[index] = newSong.id
                              finished()
                          }
                      })
                  }
              })
          })

          function finished(){
              completed += 1
              if (completed === songObjects.length) {
                  console.log(topSongs)
                  user.set('topSongs', topSongs)
                  user.save()
              }
          }
      })
      //Response Unsuccessful
      .catch(function (error) {
          cb(error);
      })
      .finally(function () {
          // always executed
      })
}

module.exports = {populateTopArtists, populateTopSongs, findMatches};

async function deleteExistingMatches(user){
  await Match.deleteMany({user1: user._id}, function (err) {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = initializeUser