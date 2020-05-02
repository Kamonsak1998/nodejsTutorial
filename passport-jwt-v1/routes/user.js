const router = require('express').Router(),
    User = require('../models/Users')

// get user
router.get('/:username',async(req,res) => {
    const { username } = req.params
    const user = await User.findOne({"username":username})
    if (user) {
        return res.json(user)}
    else{
        return res.json({"message":"User not found"})
    }
    
})

// update user
router.put('/:username',async(req,res) => {
    const { username } = req.params
    const {password, firstName, lastName, birthDate} = req.body
    const passwordHashed = bcrypt.hashSync(password,10)
    const user = await User.findOneAndUpdate({"username":username},{$set:{
        password: passwordHashed,
        firstName,
        lastName,
        birthDate
    }})
    if (user) {
        return res.json({"message":"Update success"})}
    else{
        return res.json({"message":"User not found"})
    }
})

// delete user
router.delete('/:username',async(req,res) => {
    const { username } = req.params
    const user = await User.findOneAndDelete({"username":username})
    if (user) {
        return res.json({"message":"Delete success"})}
    else{
        return res.json({"message":"User not found"})
    }
})

module.exports = router;