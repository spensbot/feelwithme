const { gql } = require('apollo-server-express');

module.exports = gql`

#-------------     OPERATIONS     ----------

  type Query {
    test: String!
    me: User
    otherUser(id: ID!): User
    myMessages: [Message!]!
    myMatches: [Match!]!
    artists(spotifyIds: [ID!]!): [Artist!]!
    tracks(spotifyIds: [ID!]!): [Track!]!
  }
  
  type Mutation {
    createMessage(to: ID!, content: String!): Message!
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
    topTracks: [String!]!
    topArtists: [String!]!
  }

  type Message {
    from: User!
    to: User!
    content: String!
    sent: Date!
    viewed: Date
  }

  type Match {
    user1: User!
    user2: User!
    trackMatch: Int!
    artistMatch: Int!
    weightedMatch: Float!
  }

  type Artist {
    name: String!
    imageUrl: URL
    spotifyUrl: URL!
  } 

  type Track {
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










 
const full = gql`

"""-------------     OPERATIONS     ----------"""

  type Query {
    me: User
    otherUser(id: ID!): User
    myMessages: [Message!]!
    myMatches: [Match!]!
    artists(spotifyIds: [ID!]!): [Artist!]!
    tracks(spotifyIds: [ID!]!): [Track!]!
  }

  type Mutation {
    updateMainUser(displayName: String, bio: String): User!
  }

  type Subscription {
    messageInProgress: ID!
    newMessage: Message!
    initializationStatusUpdate: InitializationStatus!
  }

"""-----------     OBJECT DEFS     ------------"""

  type User {
    spotifyId: ID!
    id: ID!
    spotifyProfileUrl: URL!
    isInitialized: Boolean!
    displayName: String!
    bio: String
    imageUrl: URL
    topTracks: [String!]!
    topArtists: [String!]!
  }

  type Message {
    from: User!
    to: User!
    content: String!
    sent: Date!
    viewed: Date
  }

  type Match {
    user1: User!
    user2: User!
    trackMatch: Int!
    artistMatch: Int!
    weightedMatch: Float!
  }

  type Artist {
    name: String!
    imageUrl: URL
    spotifyUrl: URL!
  } 

  type Track {
    name: String!
    artistName: String!
    spotifyUrl: URL!
    imageUrl: URL
  }

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