const { RESTDataSource } = require('apollo-datasource-rest');
const apiRoutes = require('../config/vars').spotifyApi

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = apiRoutes.url;
  }

  initialize(config) {
    this.context = config.context;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', 'Bearer ' + this.context.token);
  }

  async getTracks({ spotifyTrackIds }){
    //comma separated ids per spotify api docs
    ids = spotifyTrackIds.join(',')

    const response = await wrappedRequest(user, apiRoutes.tracks, {ids: ids})

    return response.tracks.map( track => reduceTrack(track) )
  }
  
  async getArtists({ spotifyArtistIds }){
    //comma separated ids per spotify api docs
    ids = spotifyArtistIds.join(',')

    const response = await wrappedRequest(user, apiRoutes.artists, {ids: ids})

    return response.artists.map( artist => reduceArtist(artist) )
  }

  //Use to "wrap" requests to spotify.
  //Checks for a valid access token.
  async wrappedRequest(user, path, params) {
    this.context.token = await getAccessToken(user)

    let response = await this.get(path, params)

    if (response.error){
      if (isTokenExpired){
        this.context.token = await refreshAccessToken(user)
        response = await this.get(path, params)
      }
    }

    return response
  }
}

function reduceTrack(track){
  return track
}

function reduceArtist(artist){
  return artist
}

//Returns a user's access token for getting data from Spotify.
//Gets a new token if necessary.
async function getAccessToken(user) {
  const timeBuffer = 60 * 1000 //1 minute

  let accessToken = user.accessToken

  if (Date.now() > (user.tokenExpirationDate - timeBuffer)) {
    accessToken = await refreshAccessToken(user)
  }

  return accessToken
}

async function refreshAccessToken(user) {
  const response = await this.post(apiRoutes.refreshTokenUrl, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
  })

  user.spotifyAccessToken = response.accessToken

  await user.save()

  return response.accessToken
}

function isTokenExpired(error){
  if (error.message === "The access token expired"){
    return true
  }
}

module.exports = SpotifyAPI;