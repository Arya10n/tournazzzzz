const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    game: { type: String, required: true},
    members: [{
        discordUsername: { type: String, required: false},
    }],
})

TeamSchema.query.byTeamName = function(name) {
    return this.where({ teamName: new RegExp(name, 'i') });
}

TeamSchema.query.byGame = function(name) {
    return this.where({ game: new RegExp(name, 'i') });
}

module.exports = mongoose.model("Teams", TeamSchema);