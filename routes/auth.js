const router = require('express').Router()
const passport = require('passport')

router.get('/', passport.authenticate('discord'))
router.get(
  '/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/',
  })
)

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout(err => {
      if (err) {
        console.log(err)
        return next(err)
      }
    })
    res.redirect('/')
  } else {
    res.redirect('/')
  }
})

module.exports = router
