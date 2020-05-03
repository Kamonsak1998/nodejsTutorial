const router = require('express').Router(),
    bcrypt = require('bcrypt')
    User = require('../models/Users')

    
// get user profile
router.get('/profile',async(req,res) => {
    return res.json(req.user).end()
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
    return res.json({"message":"Update success"}).end()
})

// delete user
router.delete('/profile',async(req,res) => {
    if (req.user.role == "admin"){
        const user = await User.findOneAndDelete({"username":req.user.username})
        return res.json({"message":"Delete success"}).end()
    }else{
        return res.status(403).json({"status": 403,"message": "Forbidden"}).end()
    }
})

module.exports = router;