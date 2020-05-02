const mongoose = require('mongoose'),
    Shcema = mongoose.Schema


const userShema = new Shcema({
        username: {
            type: String,
            unique: true,
        },
        firstName: String,
        lastName: String,
        password: String,
        birthDate: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    }),
    
    UserModel = mongoose.model('users',userShema)

module.exports = UserModel