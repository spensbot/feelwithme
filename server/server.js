require("dotenv").config()
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const express = require('express')
//CUSTOM
const auth = require('./routes/auth')
const sessionParser = require('./config/sessionParser')
const vars = require('./config/vars')

//---------------     MONGOOSE CONFIG     ----------------

require('./config/mongooseConfig')

//---------------     PASSPORT CONFIG     ----------------

require('./config/passportConfig')

//---------------     APOLLO-SERVER CONFIG     ----------------

const server = require('./config/apolloConfig')()
 
//---------------     EXPRESS CONFIG     ----------------

const app = express()

app.set('view engine', 'ejs')
app.set('trust proxy', 1)

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: vars.corsUrl, credentials: true }))
app.use(sessionParser)
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/auth', auth)

//---------------     START THE SERVER     ----------------

server.applyMiddleware({app})

//---------------     404 catchall     ------------------
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/404.html')
})
 
app.listen({ port: vars.serverPort }, () =>
  console.log(`🚀 Server ready at http://localhost:${vars.serverPort}${server.graphqlPath}`)
)