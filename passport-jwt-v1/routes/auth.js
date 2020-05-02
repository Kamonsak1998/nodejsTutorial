const router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = require('../models/Users')

// register
router.post('/register',(req,res) => {
    const {username, password, firstName, lastName, birthDate} = req.body
    const passwordHashed = bcrypt.hashSync(password,10)
    const user = new User({
        username,
        password: passwordHashed,
        firstName,
        lastName,
        birthDate
    })
    user.save()
    return res.json({user,"message": 'Successfully registered'})
})

// login
router.post('/login',async(req,res) => {
        const {username, password} = req.body
        const user = await User.findOne({"username":username})
        if (user){
            if (bcrypt.compareSync(password,user.password)){
                const token = jwt.sign(user.username,'God_Dev_JWT_SECRET')
                return res.json({token,"message":"Logged in"})
            }else{
                return res.json({"message":"Username or Password is incorrect"})
            }
        }else{
            return res.json({"message":"Username or Password is incorrect"})
    }
})



module.exports = router;