const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        required:true,
        default:0
    },
    cart:{
        type:Array,
        default:[],
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema)