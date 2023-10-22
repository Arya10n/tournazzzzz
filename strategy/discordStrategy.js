const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const discordUser = require('../models/discordUser');

passport.serializeUser((user, done) => {
    console.log('Serializing user');
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user');
    const user = await discordUser.findById(id);
    if(user) {
        done(null, user);
    }
})

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await discordUser.findOne({ discordId: profile.id });
        if(user) {
            console.log('User exists');
            done(null, user);
        } else {
            console.log('User doesnt exists');
            const newUser = await discordUser.create({
                discordId: profile.id,
                discordUsername: profile.username,
            })
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch(err) {
        console.log('Error at strategy: '+err);
        done(err, null);
    }
}))