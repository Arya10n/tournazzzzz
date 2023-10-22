const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')

const session = require('express-session')
const passport = require('passport')
const discordStrategy = require('./strategy/discordStrategy')
const isAuthorize = require('./middleware/authorize')

const db = require('./db/connect')
db.then(() => {
  console.log('Connected to mongodb')
}).catch(err => console.log(err))

// Routes
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')

// Express Session
app.use(
  session({
    secret: 'just dont',
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * 24,
    // },
    // resave: true,
    saveUninitialized: false,
    name: 'discord.oauth',
  })
)

app.use(express.static(path.join(__dirname, '/public')))

// Passport Session
app.use(passport.initialize())
app.use(passport.session())

// Middleware Routes
app.use('/auth', authRoute)
app.use('/profile', isAuthorize, profileRoute)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/api/login', (req, res) => {
  if (req.user) {
    res.json({ sucess: true, login: true })
  } else {
    res.json({ sucess: true, login: false })
  }
})

app.get('/browse', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/browse.html'))
})

app.listen(3000, () => {
  console.log('Server listening on 3000...')
})
