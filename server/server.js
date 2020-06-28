require("dotenv").config()
const bodyParser = require('body-parser')
const passport = require('passport')
const express = require('express')
//CUSTOM
const auth = require('./routes/auth')
const sessionParser = require('./config/sessionParser')
const config = require('./config/config')

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
app.use(sessionParser)
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/auth', auth)

//---------------     Apply the express app     -------------
const corsOptions = {
  origin: config.appUrl,
  credentials: true
}

server.applyMiddleware({
  app,
  cors: corsOptions
})

//---------------    Let's Encrypt SSL Verification     ------------
app.get('/.well-known/acme-challenge/G2AIOCnCsxxHursDFklYsLBzLy5rLBt1mCi2-kV4b8A', (req, res) => {
  res.sendFile(__dirname + '/G2AIOCnCsxxHursDFklYsLBzLy5rLBt1mCi2-kV4b8A')
})

//---------------     404 catchall     ------------------
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/404.html')
})
 
//---------------     START THE SERVER     ----------------
app.listen({ port: config.serverPort }, () =>
  console.log(`🚀 Server ready at ${config.serverUrl}${server.graphqlPath}`)
)