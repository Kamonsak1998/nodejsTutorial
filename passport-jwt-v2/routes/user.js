const router = require('express').Router(),
    bcrypt = require('bcrypt')
    User = require('../models/Users'),
    { check, validationResult } = require('express-validator')

    
// get user profile
router.get('/profile',async(req,res) => {
    return res.json(req.user).end()
})

// update user
router.put('/profile',[
    check('password').isLength({min: 6})
],async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    }
    const {password, firstName, lastName, birthDate} = req.body
    const passwordHashed = bcrypt.hashSync(password,10)
    const user = await User.findOneAndUpdate({"email":req.user.email},{$set:{
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
        const user = await User.findOneAndDelete({"email":req.user.email})
        return res.json({"message":"Delete success"}).end()
    }else{
        return res.status(403).json({"status": 403,"message": "Forbidden"}).end()
    }
})

module.exports = router;