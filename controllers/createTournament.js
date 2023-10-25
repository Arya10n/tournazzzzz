const Tournaments = require('../models/tournament')

const createTournament = async (req, res) => {
  const { tournamentName, organiserName, discordGuildInvite, startDate, endDate, tournamentGame } = req.body
  let success = true
  let sameTournament = []

  sameTournament = await Tournaments.find().byTournamentName(tournamentName).byOrganiserName(organiserName)
  if (sameTournament.length > 0) {
    return res.json({ success: false, msg: 'Tournament already exists' })
  }

  if (discordGuildInvite) {
    const newTournamentInfo = await Tournaments.create({
      tournamentName: tournamentName,
      organiserName: organiserName,
      discordGuildInvite: discordGuildInvite,
      startDate: startDate,
      endDate: endDate,
      game: tournamentGame,
    })
    console.log('Tournament created')
  } else {
    const newTournamentInfo = await Tournaments.create({
      tournamentName: tournamentName,
      organiserName: organiserName,
      startDate: startDate,
      endDate: endDate,
      game: tournamentGame,
    })
    console.log('Tournament created')
  }

  res.status(201).json({ sucess: true, msg: 'Tournament created' })
}

module.exports = { createTournament }
