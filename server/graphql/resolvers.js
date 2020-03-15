module.exports = {
  Query: {
    me: (_, __, {dataSources}) => dataSources.fwmAPI.getActiveUser(),
    user: (_, {id}, {dataSources}) => dataSources.fwmAPI.getUser(id),
    messages: (_, __, {dataSources}) => dataSources.fwmAPI.getActiveUserMessages(),
    matches: (_, {limit} = {limit: 10}, {dataSources}) => dataSources.fwmAPI.getActiveUserMatches(limit),
    // tracks: (_, {spotifyIds}, {dataSources}) => dataSources.spotifyAPI.getTracks(spotifyIds),
    // artists: (_, {spotifyIds}, {dataSources}) => dataSources.spotifyAPI.getArtists(spotifyIds),
  },

  Mutation: {
    createMessage: (_, {to, content}, {dataSources}) => dataSources.fwmAPI.createMessage(to, content),
    setMessageViewed: (_, {messageId}, {dataSources}) => dataSources.fwmAPI.viewedMessage(messageId),
    updateProfile: (_, {displayName, bio}, {dataSources}) => dataSources.fwmAPI.updateActiveUser(displayName, bio)
  },

  User: {
    topTracks: async (user, __, {dataSources}) => {
      return dataSources.spotifyAPI.getTracks(user.topTracks.join(','))
    },
    topArtists: async (user, __, {dataSources}) => {
      return dataSources.spotifyAPI.getArtists(user.topArtists.join(','))
    }
  }
};