const router = require('express').Router();

const { createTournament } = require('../controllers/createTournament');
const { getEditTournament, postEditTournament } = require('../controllers/editTournament');
const { reportTournament } = require('../controllers/reportTournament');

router.route('/create').post(createTournament);
router.route('/:organiserName/:tournamentName').get(getEditTournament).post(postEditTournament);
router.route('/:organiserName/:tournamentName/report/:matchId').get(reportTournament);

module.exports = router;