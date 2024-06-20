const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username:String,
    lastname:String,
    email:String,
    studentid:String,
    state:String,
    gender:String,
});

module.exports = mongoose.model("users", usersSchema)