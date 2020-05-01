var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
  console.log('isLoggedIn')
  if (req.isAuthenticated()) {
    console.log('isAuthenticated')
    next()
  }else{
    console.log('noLoggedIn')
    res.redirect('/login')
  }
  next()
}

router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/register',(req,res) => {
  res.render('register')
})

router.get('/login',(req,res) => {
  res.render('login')
})

module.exports = router;
