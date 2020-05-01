const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
},
{
    timestamps: true,
    versionKey: false,
}
)

const UsersModel = mongoose.model('users',UsersSchema)

module.exports = UsersModel