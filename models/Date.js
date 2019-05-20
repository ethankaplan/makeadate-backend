const mongoose = require('mongoose')

const DateSchema = new mongoose.Schema({
    location:String,
    activity:Object,
    dinner:Object


})

module.exports=mongoose.model('Date',DateSchema)