const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config();

// Middleware
const isAuthorize = require('./middleware/authorize');
const recommendation = require('./middleware/recommendation');
const searchTournaments = require('./middleware/search');

// Strategy
const discordStrategy = require('./strategy/discordStrategy')

// Routes
const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute');
const teamRoute = require('./routes/teamRoute');
const tournamentRoute = require('./routes/tournamentRoute');
const userRoute = require('./routes/userRoute');

// Static calls
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session
app.use(session({
    secret: 'just dont',
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * 24,
    // },
    resave: true,
    saveUninitialized: false,
    name: 'tournament-website',
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
}))

// Passport Session
app.use(passport.initialize());
app.use(passport.session());

// Routes calls
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/api/team', teamRoute);
app.use('/api/tournament', tournamentRoute);
app.use('/api/user', userRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/browse', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/browse.html'))
})

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/create.html'));
})

app.get('/api/checkLogin', (req, res) => {
    if(req.user) {
        res.json({sucess: true, login: true});
    } else {
        res.json({sucess: true, login: false});
    }
})

app.get('/api/recommendation', [isAuthorize, recommendation], (req, res) => {
    res.sendStatus(200);
})

app.get('/api/search', searchTournaments, (req, res) => {
    res.sendStatus(200);
})

const start = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on ${process.env.PORT}...`);
        })
        await mongoose.connect(process.env.MONGODB_URL);
        if (mongoose.connection.readyState === 1) {
            console.log('Mongoose is connected.');
        } else {
            console.log('Mongoose is not connected.');
        }
    } catch (err) {
        console.log(err);
    }
}

start();