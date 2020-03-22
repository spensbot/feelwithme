const config = {
  isDeployed: !!process.env.NODE_ENV,
  localSpotifyCallback: '/auth/spotify/callback',
  spotifyApi:{
    url: 'https://api.spotify.com/v1/',
    userTopArtists: 'me/top/artists',
    userTopTracks: 'me/top/tracks',
    artists: 'artists',
    tracks: 'tracks',
    refreshTokenUrl: 'https://accounts.spotify.com/api/token'
  },
  appPort: 3000, //Default when running a react in dev mode. I didn't set this
  serverPort: process.env.PORT || 8000, //This sets the express server port in server.js
  dbName: 'feelwithme',
  secureCookies: true,
  serverUrl: "https://feelwithme.herokuapp.com",
  appUrl: "https://feelwithme.netlify.com",
  dbUri: process.env.DB_URI + 'feelwithme' + "?retryWrites=true&w=majority"
}

if (!config.isDeployed){
  config.secureCookies = false
  config.serverUrl = "http://localhost:" + config.serverPort;
  config.appUrl = "http://localhost:" + config.appPort;
  config.dbUri = 'mongodb://localhost:27017/' + config.dbName;
}

module.exports = config