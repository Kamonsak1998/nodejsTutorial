const bcrypt = require('bcrypt')
    User = require('../models/Users'),
    validationResult = require('express-validator').validationResult

// getProfile
getProfile = async(req,res) => {
    return res.json(req.user).end()
}

// updateProfile
updateProfile = async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    }
    const {password, firstName, lastName, birthDate} = req.body
    const passwordHashed = bcrypt.hashSync(password,10)
    await User.findOneAndUpdate({"email":req.user.email},{$set:{
        password: passwordHashed,
        firstName,
        lastName,
        birthDate
    }}) 
    return res.json({"message":"Update success"}).end()
}

// deleteProfile
deleteProfile = async(req,res) => {
        const user = await User.findOneAndDelete({"email":req.user.email})
        return res.json({"message":"Delete success"}).end()
}


const userController = {
    getProfile,
    updateProfile,
    deleteProfile
}

module.exports = userController