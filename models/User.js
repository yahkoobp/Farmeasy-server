const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname :{type:String ,required:true},
        lastname : {type:String}, 
        email : {type:String ,unique:true},
        password :{type:String},
        city :{type:String},
        cartProducts:{type :Array},
        orders:{type:Array},
        isSeller:{type:Boolean, default:false},
        phone:{type:Number}
    
    },
    {timestamps:true}
    
)

module.exports = mongoose.model("User",userSchema)