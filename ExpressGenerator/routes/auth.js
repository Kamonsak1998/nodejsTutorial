var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')

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

router.post('/login', async(req, res) => {
  const { username, password } = req.body
  // simple validation
  if (!username || !password) {
    return res.render('home', { message: 'Please try again' })
  }
  console.log("username,password",username,password)
  const user = await User.findOne({ 
    username
  })

  if (user) {
    console.log('------------------------1')
    const isCorrect = bcrypt.compareSync(password,user.password)
    if(isCorrect){
      console.log('------------------------2')
      req.session.user = user
      return res.redirect('/')
    } else {
      console.log('------------------------3')
      return res.render('home',{ message: 'Username or Password incorrect'})
    }
  } else {
    console.log('------------------------4')
    res.render('home', { message: 'Username does not exist' })
  }
})

module.exports = router;
