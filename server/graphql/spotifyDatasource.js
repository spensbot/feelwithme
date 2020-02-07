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

    const response = await this.get(apiRoutes.tracks, {ids: ids})

    return response.tracks.map( track => reduceTrack(track) )
  }
  
  async getArtists({ spotifyArtistIds }){
    //comma separated ids per spotify api docs
    ids = spotifyArtistIds.join(',')

    const response = await this.get(apiRoutes.artists, {ids: ids})

    return response.artists.map( artist => reduceArtist(artist) )
  }
}

function reduceTrack(track){
  
}

function reduceArtist(artist){

}

module.exports = SpotifyAPI;