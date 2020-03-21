const { RESTDataSource } = require('apollo-datasource-rest');
const apiRoutes = require('../config/vars').spotifyApi
const axios = require('axios')
const qs = require('querystring')


class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = apiRoutes.url;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', 'Bearer ' + this.context.user.spotifyAccessToken)
  }

  async getTracks(spotifyIds){
    //comma separated ids per spotify api docs
    const ids = spotifyIds.join(',')

    const response = await this.wrappedRequest(this.context.user, 'tracks', {ids: ids})

    const tracks = response.tracks

    return Array.isArray(tracks)
      ? tracks.map( track => reduceTrack(track))
      : [];
  }

  async getArtists(spotifyIds){
    //comma separated ids per spotify api docs
    const ids = spotifyIds.join(',')

    const response = await this.wrappedRequest(this.context.user, 'artists', {ids: ids})

    const artists = response.artists

    return Array.isArray(artists)
      ? artists.map( artist => reduceArtist(artist))
      : [];
  }

  //Use to "wrap" requests to spotify.
  //Checks for a valid access token.
  async wrappedRequest(user, path, params) {
    this.context.accessToken = await this.getAccessToken(user)

    let response = await this.get(path, params)
    
    return response
  }

  //Returns a user's access token for getting data from Spotify.
  //Gets a new token if necessary.
  async getAccessToken(user) {
    const timeBuffer = 60 * 1000 //1 minute

    if (Date.now() > (user.tokenExpirationDate - timeBuffer)) {
      await this.refreshAccessToken(user)
    }
  }

  async refreshAccessToken(user) {

    const requestData = qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: user.spotifyRefreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    })

    const requestConfig = {
        url: apiRoutes.refreshTokenUrl,
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: 'json',
        data: requestData
    }

    const response = await axios.request(requestConfig)
    const data = response.data

    user.spotifyAccessToken = data.access_token
    user.tokenExpirationDate = Date.now() + (data.expires_in * 1000)

    await user.save()
  }
}

function reduceTrack(track){
  const reducedTrack = {
    id: track.id,
    name: track.name,
    artistName: track.artists[0].name,
    spotifyUrl: track.external_urls.spotify,
    imageUrl: null,
    popularity: track.popularity
  }

  if (track.album.images[0]) {
    reducedTrack.imageUrl = track.album.images[0].url
  }

  return reducedTrack
}

function reduceArtist(artist){
  const reducedArtist = {
    id: artist.id,
    name: artist.name,
    spotifyUrl: artist.external_urls.spotify,
    imageUrl: null,
    popularity: artist.popularity
  }

  if (artist.images[0]) {
    reducedArtist.imageUrl = artist.images[0].url 
  }

  return reducedArtist
}

function isTokenExpired(error){
  if (error.message === "The access token expired"){
    return true
  }
}

module.exports = SpotifyAPI;