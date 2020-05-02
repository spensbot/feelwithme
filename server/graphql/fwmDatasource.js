const { DataSource } = require('apollo-datasource');
//Custom
const User = require('../models/user');
const Message = require('../models/message');
const Match = require('../models/match');

class FwmAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

//---------------------     QUERIES     ----------------------

  async getActiveUser(){
    let activeUser = null

    if (this.context.user && this.context.user.id){
      activeUser = User.findById(this.context.user.id)
    }
    return activeUser
  }

  async getUser( id ){
    const user = await User.findById(id)
    return user
  }

  async getActiveUserMatches(limit = 5){

    const matches1 = await Match.find({user1: this.context.user.id})
    .sort({'weightedMatch': -1})
    .limit(limit)
    .populate('user2')

    const matches1Mod = matches1.map(function(match){
      match.user = match.user2
      return match
    })

    const matches2 = await Match.find({user2: this.context.user.id})
    .sort({'weightedMatch': -1})
    .limit(limit)
    .populate('user1')

    const matches2Mod = matches2.map(function(match){
      match.user = match.user1
      return match
    })

    const sortedMatches = matches1Mod.concat(matches2Mod).sort((a, b) => b.weightedMatch - a.weightedMatch)

    const matches = sortedMatches.slice(0, limit)

    return matches
  }

  async getAllMessages(){
    const messages = await Message.find({
      $or: [ 
        {from: this.context.user.id},
        {to: this.context.user.id}
      ]
    })//.populate('from').populate('to')

    return messages
  }

  async getScopedMessages(id){
    const userId = this.context.user.id

    const messages = await Message.find({
      $or: [
        {
          $and: [
            {from: userId},
            {to: id}
          ]
        },
        {
          $and: [
            {from: id},
            {to: userId}
          ]
        },
      ]
    }).sort( {sent: 1} )

    //MyModel.distinct('_id', { foo: 'bar' }, function(error, ids)

    return messages
  }

  async getMessagedUsers() {
    const sentMessages = await Message.find({ from: this.context.user })
    const receivedMessages = await Message.find({ to: this.context.user })

    const messagedUsers = []

    sentMessages.forEach( function(message){

      const to = message.to.toString()

      if(!messagedUsers.includes(to)){
        messagedUsers.push(to)
      }
    })

    receivedMessages.forEach( function(message){

      const from = message.from.toString()

      if(!messagedUsers.includes(from)){
        messagedUsers.push(from)
      }
    })

    return messagedUsers
  }

  async getNewMessages() {
    const newMessages = await Message.find( {
      $and: [
        { to: this.context.user },
        { viewed: null }
      ]
    })

    return newMessages
  }

//-----------------------     MUTATIONS     --------------------

  async createMessage( to, content ){
    const message = new Message({
      from: this.context.user.id,
      to: to,
      content: content
    })

    return await message.save()
  }

  async setMessageViewed( messageId ) {
    const message = await Message.findById(messageId)
    message.viewed = Date.now()
    return await message.save()
  }

  async updateActiveUser( displayName, bio ) {
    if(displayName){
      this.context.user.displayName = displayName
    }
    if(bio) {
      this.context.user.bio = bio
    }

    return await this.context.user.save()
  }
}

//-----------------------     HELPERS     -------------------------

    
module.exports = FwmAPI;