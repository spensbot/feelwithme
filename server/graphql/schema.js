const { gql } = require('apollo-server-express');

module.exports = gql`

#-------------     OPERATIONS     ----------

  type Query {
    me: User
    user(id: ID!): User
    messages: [Message!]!
    matches(limit: Int): [Match!]!
  }
  
  type Mutation {
    createMessage(to: ID!, content: String!): Message!
    setMessageViewed(message: ID!): Message
    updateProfile(displayName: String, bio: String): User!
  }

  type Subscription {
    messageInProgress: ID!
    newMessage: Message!
    viewedMessage: Message!
    initializationStatusUpdate: InitializationStatus!
  }

#-----------     OBJECT DEFS     ------------

  type User {
    spotifyId: ID!
    id: ID!
    spotifyProfileUrl: URL!
    isInitialized: Boolean!
    displayName: String!
    bio: String
    imageUrl: URL
    topTracks: [Track!]!
    topArtists: [Artist!]!
  }

  type Message {
    from: User!
    to: User!
    content: String!
    sent: Date!
    viewed: Date
  }

  type Match {
    user: User!
    trackCount: Int!
    artistCount: Int!
    weightedMatch: Float!
  }

  type Artist {
    spotifyId: ID!
    name: String!
    imageUrl: URL
    spotifyUrl: URL!
  } 

  type Track {
    spotifyId: ID!
    name: String!
    artistName: String!
    spotifyUrl: URL!
    imageUrl: URL
  }

#------------     TYPE DEFS     -----------

  enum InitializationStatus {
    UNINITIALIZED
    FETCHING_ARTISTS
    FETCHING_TRACKS
    CALCULATING_MATCHES
    SUCCESS
    FAILURE
  }

  scalar Date
  scalar URL
`;