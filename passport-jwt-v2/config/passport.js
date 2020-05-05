const passport = require('passport'), 
    passportJWT = require('passport-jwt'),
    JWTStraegy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    bcrypt = require('bcrypt'),
    fs = require('fs'),
    privateKey = fs.readFileSync(__dirname+'/../config/private.key'),
    User = require('../models/Users')

passport.use(new JWTStraegy({
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : privateKey
    },
    (jwtPayload,cb) => {
    User.findOne({"email":jwtPayload.email}, (err,user) => {
        if (err){
            return cb(err)
        }
        if (!user){
            return cb(null,false,{message: 'Incorrect email or password.'})
        }else{
            return cb(null,user)
        }
    })
}))