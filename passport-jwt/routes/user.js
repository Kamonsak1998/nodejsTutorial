const router = require('express').Router(),
    User = require('../models/Users'),
    bcrypt = require('bcrypt')


// create user
router.post('/',(req,res) => {
    const { username, password} = req.body
    const passwordHashed = bcrypt.hashSync(password,10)
    const user = new User({
        username,
        password: passwordHashed,
    })
    user.save()
    return res.json({user,"message": 'Successfully registered'})
})

module.exports = router;