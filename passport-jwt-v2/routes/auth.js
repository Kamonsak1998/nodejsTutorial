const router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    fs = require('fs')
    User = require('../models/Users')

// register
router.post('/register',(req,res) => {
    const {username, password, firstName, lastName, birthDate} = req.body
    User.count({"username":username},(error, count) => {
        if (count>0){
            return res.json({"message":"User already exists"})
        }else{
            const passwordHashed = bcrypt.hashSync(password,10)
            const user = new User({
                username,
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
})

// login
router.post('/login',async(req,res) => {
        const {username, password} = req.body
        const privateKey = fs.readFileSync(__dirname+'/../config/private.key')
        const user = await User.findOne({"username":username})
        const payload = {
            username: username,
            iat: new Date().getTime(),
        }
        if (user){
            if (bcrypt.compareSync(password,user.password)){
                const token = jwt.sign(payload,privateKey)
                return res.json({token,"message":"Logged in"})
            }else{
                return res.json({"message":"Username or Password is incorrect"})
            }
        }else{
            return res.json({"message":"Username or Password is incorrect"})
    }
})

module.exports = router;