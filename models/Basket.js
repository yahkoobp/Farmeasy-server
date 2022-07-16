const mongoose = require('mongoose')
const user = require("./User")
const product = require("./Product")
const router = require('../routes/product')

const BasketSchema = mongoose.Schema(
    {
        userId :{type:mongoose.SchemaTypes.ObjectId ,ref:user,index:true},
        products:[ ]
    },
    {timestamps : true}
)


module.exports = mongoose.model("Basket",BasketSchema)
