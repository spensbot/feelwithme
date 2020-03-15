const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const matchSchema = new mongoose.Schema({
  user1: { type: ObjectId, ref: 'User', index: true, required: true },
  user2: { type: ObjectId, ref: 'User', index: true, required: true },
  trackCount: Number,
  artistCount: Number,
  weightedMatch: Number
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match