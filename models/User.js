const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  dates:[{location:String,activity:Object,dinner:Object}]
})

module.exports = mongoose.model('User', UserSchema)