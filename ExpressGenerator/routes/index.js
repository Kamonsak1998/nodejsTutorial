var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login')
    console.log('nologgin')
  }
  console.log('isloggin')
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
