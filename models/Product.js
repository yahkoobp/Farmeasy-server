const mongoose = require('mongoose');
const user = require("./User")
const ProductSchema = new mongoose.Schema(
    {
        title :{type:String },
        desc : {type:String },
        category :{type:String ,required:true},
        subcat:{type:String ,required:true},
        image:{type:String },
        seller:{type:mongoose.SchemaTypes.ObjectId, ref:user},
        address :{type:String},
        place :{type:String},
        price :{type:Number , required:true},
        Locality:{type:String},
        available:{type:String},
        isDelivered:{type:Boolean,default:false}
    
    },
    {timestamps:true}
)

module.exports = mongoose.model("Product",ProductSchema)