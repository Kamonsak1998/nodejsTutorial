var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')


const User = require('../models/Users')

router.post('/register', (req, res) => {
  const { name, username, password } = req.body
  // simple validation
  if (!username || !password || !name) {
    return res.render('register', { message: 'Please try again' })
  }
  const passwordHashed = bcrypt.hashSync(password, 10)
  const user = new User({
    name,
    username,
    password: passwordHashed
  })
  user.save()
  res.render('index', { user })
})

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login', // กำหนด ถ้า login fail จะ redirect ไป /login
    successRedirect: '/' // ถ้า success จะไป /
  }),
  async (req, res) => {
    const { username, password } = req.body
    return res.redirect('/')
  }
)

router.get('/logout',(req,res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router;
