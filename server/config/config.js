const config = {
  isDeployed: !!process.env.NODE_ENV,
  appPort: 3000, //Default when running a react in dev mode. I didn't set this
  serverPort: process.env.PORT || 8000, //This sets the express server port in server.js
  dbName: 'feelwithme',
  cookieSettings: {
    maxAge: 1000*60*60*24*5,
    secure: true,
    sameSite: "none"
  },
  serverUrl: "https://feelwithme.herokuapp.com",
  appUrl: "https://feelwithme.net",
  dbUri: process.env.DB_URI + 'feelwithme' + "?retryWrites=true&w=majority",

  awsBucketName: 'feelwithme-profile-pics',

  spotifyApi:{
    localCallback: '/auth/spotify/callback',
    url: 'https://api.spotify.com/v1/',
    userTopArtists: 'me/top/artists',
    userTopTracks: 'me/top/tracks',
    artists: 'artists',
    tracks: 'tracks',
    refreshTokenUrl: 'https://accounts.spotify.com/api/token'
  }
}

if (!config.isDeployed){
  config.cookieSettings.sameSite = undefined
  config.cookieSettings.secure = false
  config.serverUrl = "http://localhost:" + config.serverPort
  config.appUrl = "http://localhost:" + config.appPort
  config.dbUri = 'mongodb://localhost:27017/' + config.dbName
  config.awsBucketName = 'feelwithme-profile-pics'
}

config.spotifyApi.callbackUrl = config.serverUrl + config.spotifyApi.localCallback

module.exports = config