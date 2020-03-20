import gql from 'graphql-tag' 

export const READ_ME = gql`
{
  me {
    spotifyId
    spotifyProfileUrl

    id
    displayName
    isInitialized
    bio
    imageUrl
  }
}`

export const READ_USER = gql`
query User($id: ID!){
  user(id: $id){
    id
    spotifyId
    spotifyProfileUrl
    isInitialized
    displayName
    bio
    imageUrl

    topTracks{
      name
      artistName
      spotifyUrl
      imageUrl
    }
    topArtists{
      name
      spotifyUrl
      imageUrl
    } 
  }

  me {
    id
    spotifyId
    spotifyProfileUrl
    isInitialized
    displayName
    bio
    imageUrl

    topTracks{
      name
      artistName
      spotifyUrl
      imageUrl
    }
    topArtists{
      name
      spotifyUrl
      imageUrl
    }
  }
}`

export const READ_USER_SHALLOW = gql`
query User($id: ID!){
  user(id: $id){
    id
    spotifyId
    spotifyProfileUrl
    isInitialized
    displayName
    bio
    imageUrl
  }
}`

export const READ_MESSAGED_USERS = gql`
{
	messagedUsers
}`

export const READ_SCOPED_MESSAGES = gql`
query scopedMessages($id: ID!){
  scopedMessages(id: $id){
    id
    from
    to
    content
    sent
    viewed
  }
}`

export const READ_MATCHES = gql`
{
  matches{
    id
    user{
      id
      displayName
      spotifyProfileUrl
      bio
      imageUrl
    }
    trackCount
    artistCount
    weightedMatch
  }
}`

export const UPDATE_PROFILE = gql`
mutation UpdateProfile($displayName: String $bio: String){
  updateProfile(displayName: $displayName bio: $bio){
    id
    displayName
    bio
  }
}`

export const CREATE_MESSAGE = gql`
mutation CreateMessage($to: ID $content: String){
  createMessage(to: $to content: $content){
    to
    from
    sent
    content
  }
}`

export default {
  readMe: READ_ME,
  readUser: READ_USER,
  readUserShallow: READ_USER_SHALLOW,
  readMessagedUsers: READ_MESSAGED_USERS,
  readScopedMessages: READ_SCOPED_MESSAGES,
  readMatches: READ_MATCHES,
  updateProfile: UPDATE_PROFILE,
  createMessage: CREATE_MESSAGE,

  // queries: {
  //   readMe: READ_ME,
  //   readUser: READ_USER,
  //   readMessagedUsers: READ_MESSAGED_USERS,
  //   readScopedMessages: READ_SCOPED_MESSAGES,
  //   readMatches: READ_MATCHES,

  // },
  // mutations: {
  //   updateProfile: UPDATE_PROFILE,
  //   createMessage: CREATE_MESSAGE
  // },
  // subscriptions: {

  // }
}