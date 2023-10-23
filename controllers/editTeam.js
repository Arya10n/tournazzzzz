const Teams = require('../models/team');

const getEditTeam = async (req, res) => {
    const { game, teamName } = req.params;
    const currentTeam = await Teams.find().byGame(game).byTeamName(teamName);
    if(currentTeam.length == 0) {
        return res.json({ success: false, msg: 'Cannot find team' });
    }
    
    const { member } = req.query;

    if(member) {

        let sameMemberCheck = false;
        if( currentTeam[0].members.length > 0 ) {
            currentTeam[0].members.forEach((registeredPlayer) => {
                if(registeredPlayer.discordUsername === member) {
                    sameMemberCheck = true;
                    return;
                }
            })
        }

        if(sameMemberCheck) {
            return res.json({ success: false, msg: 'Member already exists' });
        }

        await Teams.findOneAndUpdate({
            teamName: {$regex: teamName, $options: 'i'}, 
            game: {$regex: game, $options: 'i'}}, 
            {$push: {members: { discordUsername: member }}});
        console.log('Updated team member');

        return res.status(201).json({ success: true, msg: "Member added"});
    }

    res.status(200).json({ success: true, msg: "No change" });
}

module.exports = { getEditTeam };