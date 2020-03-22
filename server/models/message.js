const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const messageSchema = mongoose.Schema({
  from: { type: ObjectId, ref: 'User', index: true, required: true },
  to: { type: ObjectId, ref: 'User', index: true, required: true },
  content: { type: String, required: true},
  sent: { type: Date, default: Date.now() },
  viewed: { type: Date, default: null }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message