const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score:{
        type:Number
    },
    level:{
       type:String
    },
    ques:{
       type:Number
    }
})

const UserDetails = mongoose.model("User", UserSchema);
module.exports = UserDetails;