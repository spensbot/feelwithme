const { ApolloServer } = require('apollo-server-express')
//Custom
const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')
const FwmAPI = require('../graphql/fwmDatasource')
const SpotifyAPI = require('../graphql/spotifyDatasource')
const User = require('../models/user')
const config = require('../config')

module.exports = function(){
  const dataSources = () => ({
    fwmAPI: new FwmAPI(),
    spotifyAPI: new SpotifyAPI(),
  })

  const context = async ({req}) => {
    let user = null

    if (req.session.passport && req.session.passport.user){
      user = await User.findById(req.session.passport.user)
    }

    return { user }
  }

  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    introspection: !config.isDeployed,
    playground: !config.isDeployed,
  })
}