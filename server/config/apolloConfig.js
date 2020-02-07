const { ApolloServer } = require('apollo-server-express')
//Custom
const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')
const FwmAPI = require('../graphql/fwmDatasource')
const SpotifyAPI = require('../graphql/spotifyDatasource')

module.exports = function(){
  const dataSources = () => ({
    fwmAPI: new FwmAPI(),
    spotifyAPI: new SpotifyAPI(),
  })

  const context = ({req}) => {
    userId = req.session.passport && req.session.passport.user ? req.session.passport.user : null
    return { userId }
  }

  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    introspection: true,
    playground: true,
  })
}