//Determine if the app is running on a local dev server (vs. deployed)
let dev = (window.location.hostname === 'localhost')
let httpProtocol = dev ? 'http' : 'https'
let serverHost = dev ? 'localhost' : 'api.feelwithme.net' //'feelwithme.herokuapp.com'
let serverPort = dev ? ':8000' : ''
let serverUrl = httpProtocol + '://' + serverHost + serverPort

const Config = {
    serverUrl: serverUrl,
    homeRoute: "",
    serverRoutes: {
        graphQLUrl: serverUrl + '/graphql',
        authUrlSpotify: serverUrl + '/auth/spotify',
        logoutUrl: serverUrl + '/auth/logout',
    },
    routes: {
        login: '/login',
        users: '/user',
        about: '/about',
        messages: '/messages'
    },
    emails: {
        contact: 'contact@feelwithme.net',
        spenser: 'spenser@feelwithme.net'
    }
}

export default Config
