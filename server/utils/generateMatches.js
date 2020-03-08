const User = require('../models/user')

//Returns users who have the most artists/songs in common with user
async function generateMatches(user, resultCount) {
  const songWeight = 0.7 //Represents the fraction that the song matches make of an overall match percentage
  const artistWeight = 1 - songWeight
  const numArtists = user.topArtists.length
  const numSongs = user.topSongs.length

  const matches = await User.aggregate([
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
    { //Calculate percentage of common artists/songs
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
  ]).exec()

  return matches.map(reduceMatch(user))
}

//A curried function
function reduceMatch(user){
  return function (aggregateMatch){
    return {
      user1: user._id,
      user2: aggregateMatch._id,
      songMatch: aggregateMatch.songMatch,
      artistMatch: aggregateMatch.artistMatch,
      weightedMatch: aggregateMatch.weightedMatch
    }
  }
}

//Returns users who have the most artists/songs in common with user
async function generateMatchesOld(user, resultCount) {
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

module.exports = generateMatches