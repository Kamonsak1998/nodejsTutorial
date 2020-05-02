const passport = require('passport'), 
    passportJWT = require('passport-jwt'),
    JWTStraegy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt
    bcrypt = require('bcrypt'),
    User = require('../models/Users')

passport.use(new JWTStraegy({
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : 'God_Dev_JWT_SECRET'
    },
    (jwtPayload,cb) => {
    User.findOne({"username":jwtPayload}, (err,user) => {
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