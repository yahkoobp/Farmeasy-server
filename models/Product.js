const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title :{type:String , required:true},
        desc : {type:String },
        categories :{type:Array ,required:true},
        seller:{type:String },
        address :{type:String},
        place :{type:String},
        price :{type:Number , required:true},
        available:{type:Boolean ,default:true}
    
    },
    {timestamps:true}
)

module.exports = mongoose.model("Product",ProductSchema)