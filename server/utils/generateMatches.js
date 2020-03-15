const User = require('../models/user')

//Returns users who have the most artists/tracks in common with user
async function generateMatches(user, resultCount) {
  const trackWeight = 0.7 //Represents the fraction that the song matches make of an overall match percentage
  const maxInCommon = 50
  const artistWeight = 1 - trackWeight

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
        commonTracks: { $setIntersection: [user.topTracks, '$topTracks'] }
      }
    },
    { //Create fields with the number of common artists and tracks
      $project: {
        _id: 1,
        spotifyId: true,
        displayName: 1,
        imageUrl: 1,
        commonArtists: true,
        commontracks: true,
        commonArtistCount: { $size: '$commonArtists' },
        commonTrackCount: { $size: '$commonTracks' }
      }
    },
    { //Calculate percentage of common artists/tracks
      $project: {
        _id: 1,
        spotifyId: true,
        displayName: 1,
        imageUrl: 1,
        commonArtists: true,
        commonTracks: true,
        commonArtistCount: true,
        commonTrackCount: true,
        artistMatch: { $divide: ['$commonArtistCount', maxInCommon] },
        trackMatch: { $divide: ['$commonTrackCount', maxInCommon] },
      }
    },
    { //Create a field for the overall, weighted match
      $project: {
        _id: 1,
        spotifyId: 1,
        displayName: 1,
        imageUrl: 1,
        commonArtists: 1,
        commontracks: 1,
        commonArtistCount: 1,
        commonTrackCount: 1,
        trackMatch: 1,
        artistMatch: 1,
        weightedMatch: {
          $add: [
            {
              $multiply: ['$artistMatch', artistWeight]
            },
            {
              $multiply: ['$trackMatch', trackWeight]
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
      trackCount: aggregateMatch.commonTrackCount,
      artistCount: aggregateMatch.commonArtistCount,
      weightedMatch: aggregateMatch.weightedMatch
    }
  }
}


module.exports = generateMatches