const vars = {
  development: process.env.NODE_ENV ? false : true,
  localSpotifyCallback: '/auth/spotify/callback',
  spotifyApi:{
    url: 'https://api.spotify.com/v1',
    userTopArtists: '/me/top/artists',
    userTopTracks: '/me/top/tracks',
    artists: '/artists',
    tracks: '/tracks',
    refreshTokenUrl: 'https://accounts.spotify.com/api/token'
  },
  appPort: 3000, //Default when running a react in dev mode. I didn't set this
  serverPort: 8000, //This sets the express server port in server.js
  dbName: 'feelwithme',
  cookieParams: {
      maxAge: 1000*60*60*24*5,
      secure: true
  },
  serverUrl: "https://feelwithme-backend.herokuapp.com",
  appUrl: "https://spensbot.github.io/feelwithme",
  corsUrl: "https://spensbot.github.io",
  dbUri: process.env.DB_URI + 'feelwithme' + "?retryWrites=true&w=majority"
}

if (vars.development){
  vars.cookieParams.secure = false
  vars.serverUrl = "http://localhost:" + vars.serverPort;
  vars.appUrl = "http://localhost:" + vars.appPort;
  vars.corsUrl = vars.appUrl;
  vars.dbUri = 'mongodb://localhost:27017/' + vars.dbName;
}

vars.spotifyCallback = vars.serverUrl + vars.localSpotifyCallback;

module.exports = vars;