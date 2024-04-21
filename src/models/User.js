const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', UserSchema)
