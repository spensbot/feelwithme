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

async function deleteExistingMatches(user){
  await Match.deleteMany({user1: user._id}, function (err) {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = { initializeUser, refreshAccessTokenIfNecessary }