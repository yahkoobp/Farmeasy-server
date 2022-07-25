const mongoose = require('mongoose')
const user = require("./User")

const OrderSchema = mongoose.Schema(
    {
        userId :{type:mongoose.SchemaTypes.ObjectId ,ref:user,index:true},
        products:{type:Array}
    },
    {timestamps : true}
)


module.exports = mongoose.model("Order",OrderSchema)