const mongoose = require('mongoose');
const user = require("./User")
const sellerRequestSchema = new mongoose.Schema(
    {
        userId :{type:mongoose.SchemaTypes.ObjectId,ref:"user"},
        firstname :{type:String ,required:true},
        lastname : {type:String}, 
        email : {type:String ,unique:true},
        city :{type:String},
        address:{type:String},
        details:{type:String},
        products:{type :Array},
        orders:{type:Array},
        isSeller:{type:Boolean,default:false},
        Rating:{type:Number}
    
    },
    {timestamps:true}
    
)

module.exports = mongoose.model("SellerRequest",sellerRequestSchema)