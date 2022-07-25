const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
    {
        firstname :{type:String ,required:true},
        lastname : {type:String}, 
        email : {type:String ,unique:true},
        password :{type:String},
    
    },
    {timestamps:true}
    
)

module.exports = mongoose.model("Admin",AdminSchema)