const jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    fs = require('fs'),
    User = require('../models/Users'),
    validationResult = require('express-validator').validationResult

// register
register = (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()})
    }
    const {email, password, firstName, lastName, birthDate} = req.body
    User.count({"email":email},(error, count) => {
    if (error){
        return res.status(500).json({"message":"Internal server serror"})
    }
    if (count>0){
        return res.json({"message":"User already exists"})
    }else{
        const passwordHashed = bcrypt.hashSync(password,10)
        const user = new User({
            email,
            password: passwordHashed,
            firstName,
            lastName,
            role: "user",
            birthDate
        })
        user.save()
        return res.status(201).json({user,"message": 'Successfully registered'}).end()
        }
    })
}

// login
login = async(req,res) => {
    const {email, password} = req.body
    const privateKey = fs.readFileSync(__dirname+'/../config/private.key')
    const user = await User.findOne({"email":email})
    const payload = {
        email: email,
        iat: new Date().getTime(),
    }
    if (user){
        if (bcrypt.compareSync(password,user.password)){
            const token = jwt.sign(payload,privateKey)
            return res.json({token,"message":"Logged in"})
        }else{
            return res.json({"message":"Email or Password is incorrect"})
        }
    }else{
        return res.json({"message":"Email or Password is incorrect"})
    }
}

const authController = {
    register,
    login,
}

module.exports = authController