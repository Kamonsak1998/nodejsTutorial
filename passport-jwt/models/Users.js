const mongoose = require('mongoose'),
    Shcema = mongoose.Schema


const userShema = new Shcema({
        username: {
            type: String,
            unique: true,
        },
        password: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }),
    
    UserModel = mongoose.model('users',userShema)

module.exports = UserModel