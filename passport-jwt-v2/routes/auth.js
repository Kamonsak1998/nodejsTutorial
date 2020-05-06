const router = require('express').Router(),
    authController = require('../controller/authController')
    check = require('express-validator').check

// register
router.post('/register',[
    check('email').isEmail(),
    check('password','Password should not be empty, minimum eight characters, at least one letter, one number and one special character').isLength({min: 8})
    ],authController.register)

// login
router.post('/login',authController.login)

module.exports = router;