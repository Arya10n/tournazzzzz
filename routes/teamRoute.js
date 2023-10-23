const router = require('express').Router();

const { createTeam } = require('../controllers/createTeam');
const { getEditTeam } = require('../controllers/editTeam');

router.route('/create').post(createTeam);
router.route('/:game/:teamName').get(getEditTeam);

module.exports = router;