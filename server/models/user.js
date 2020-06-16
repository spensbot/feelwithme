const mongoose = require('mongoose')

//const ObjectId = mongoose.Schema.Types.ObjectId

// const initializationStatus = {
//     UNINITIALIZED: 'UNINITIALIZED',
//     FETCHING_ARTISTS: 'FETCHING_ARTISTS',
//     FETCHING_TRACKS: 'FETCHING_TRACKS',
//     CALCULATING_MATCHES: 'CALCULATING_MATCHES',
//     SUCCESS: 'SUCCESS',
//     FAILURE: 'FAILURE'
// }

const userSchema = new mongoose.Schema({
    spotifyId: { type: String, unique: true, required: true, index: true }, //Originally "id"
    spotifyProfileUrl: String, //Originally "external_urls.spotify"
    spotifyImageUrl: String, //Originally "images[0].url"
    spotifyDisplayName: String, //Originally "display_name"
    spotifyCountry: String,
    spotifyHref: String, //The api endpoint url for accessing a user profile

    spotifyRefreshToken: String,
    spotifyAccessToken: String,
    tokenExpirationDate: Date,

    //Custom FWM fields
    isInitialized: { type: Boolean, default: false },
    lastInitialized: Date,
    initializationTime: Number,
    darkMode: { type: Boolean, default: true},
    displayName: String,
    bio: String,
    imageUrl: String,
    topTracks: [String],
    topArtists: [String]
})

userSchema.methods.mapSpotifyObject = function (userObject, accessToken, refreshToken, expiresIn) {
    this.spotifyId = userObject.id
    this.spotifyProfileUrl = userObject.external_urls.spotify
    if (userObject.images[0]) {
        this.spotifyImageUrl = userObject.images[0].url
        this.imageUrl = this.spotifyImageUrl
    }
    this.spotifyDisplayName = userObject.display_name
    this.displayName = this.spotifyDisplayName

    this.spotifyCountry = userObject.country
    this.spotifyHref = userObject.href

    this.spotifyRefreshToken = refreshToken
    this.spotifyAccessToken = accessToken
    this.tokenExpirationDate = Date.now() + (expiresIn * 1000)
}

userSchema.pre('save', function() {
    //console.log(`Attempting save user: ${this.displayName}`)
})


const User = new mongoose.model("User", userSchema)

module.exports = User

