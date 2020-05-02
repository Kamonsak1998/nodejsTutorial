const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    User = require('../models/Users')

passport.use(new LocalStrategy((username,password,cb) => {
    User.findOne({username}, (err,user) => {
        if (err){
            return cb(err)
        }
        if (!user){
            return cb(null,false,{message: 'Incorrect email or password.'})
        }else{
            if(bcrypt.compareSync(password,user.password)){
                console.log(user)
                return cb(null,user,{message: 'Logged In'})
            }else{
                return cb(null,false,{message: 'Incorrect email or password.'})
            }
        }

    })
}))