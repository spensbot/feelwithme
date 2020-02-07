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

  async getActiveUser(){
    let activeUser = null
    if (this.context && this.context.userId){
      activeUser = await User.findById(this.context.userId)
    }
    return activeUser
  }

  async getUser({ id }){
    user = await User.findById(id)
    return user
  }

  async updateUser({  }){
    return null
  }

  async getMatches({  }){
    return null
  }

  async getMessages({ userId }){
    return null
  }
}
    
module.exports = FwmAPI;