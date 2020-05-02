const router = require('express').Router(),
    bcrypt = require('bcrypt')
    User = require('../models/Users')

// get user
router.get('/profile',async(req,res) => {
    return res.json(req.user)
})

// update user
router.put('/profile',async(req,res) => {
    const {password, firstName, lastName, birthDate} = req.body
    const passwordHashed = bcrypt.hashSync(password,10)
    const user = await User.findOneAndUpdate({"username":req.user.username},{$set:{
        password: passwordHashed,
        firstName,
        lastName,
        birthDate
    }})
    return res.json({"message":"Update success"})
})

// delete user
router.delete('/profile',async(req,res) => {
    const user = await User.findOneAndDelete({"username":req.user.username})
    return res.json({"message":"Delete success"})
})

module.exports = router;