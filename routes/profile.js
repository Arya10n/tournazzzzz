const router = require('express').Router();
const authorize = require('../middleware/authorize');

router.get('/', (req, res, next) => {
    res.status(200).send('Profile Page');
})

module.exports = router;