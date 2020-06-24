module.exports = {
  Query: {
    me: (_, __, {dataSources}) => dataSources.fwmAPI.getActiveUser(),
    user: (_, {id}, {dataSources}) => dataSources.fwmAPI.getUser(id),
    allMessages: (_, __, {dataSources}) => dataSources.fwmAPI.getAllMessages(),
    scopedMessages: (_, {id}, {dataSources}) => dataSources.fwmAPI.getScopedMessages(id),
    newMessages: (_, __, {dataSources}) => dataSources.fwmAPI.getNewMessages(),
    messagedUsers: (_, __, {dataSources}) => dataSources.fwmAPI.getMessagedUsers(),
    matches: (_, {limit}, {dataSources}) => dataSources.fwmAPI.getActiveUserMatches(limit),
    tracks: (_, {spotifyIds}, {dataSources}) => dataSources.spotifyAPI.getTracks(spotifyIds),
    artists: (_, {spotifyIds}, {dataSources}) => dataSources.spotifyAPI.getArtists(spotifyIds),
  },

  Mutation: {
    createMessage: (_, {to, content}, {dataSources}) => dataSources.fwmAPI.createMessage(to, content),
    setMessageViewed: (_, {message}, {dataSources}) => dataSources.fwmAPI.viewedMessage(message),
    updateProfile: (_, {displayName, bio, imageUrl}, {dataSources}) => dataSources.fwmAPI.updateActiveUser(displayName, bio, imageUrl)
  },

  User: {
    topTracks: async (user, __, {dataSources}) => {
      return dataSources.spotifyAPI.getTracks(user.topTracks)
    },
    topArtists: async (user, __, {dataSources}) => {
      return dataSources.spotifyAPI.getArtists(user.topArtists)
    }
  }
};