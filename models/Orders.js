const mongoose = require('mongoose')

const BasketSchema = mongoose.Schema(
    {
        userId :{type:mongoose.SchemaTypes.ObjectId ,ref:user,index:true},
        products:[ ]
    },
    {timestamps : true}
)


module.exports = mongoose.model("Basket",BasketSchema)