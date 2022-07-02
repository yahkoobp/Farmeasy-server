const {Router} = require("express")
const userModel = require ("../models/User")
const {status} = require("express/lib/response")
const productModel = require("../models/Product")
const router = require("express").Router()

//CREATE
router.post("/", async (req, res) => {
    const newProduct = new productModel(req.body);
  
    try {
         const savedProduct= await newProduct.save()
         res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
});

//UPDATE

router.put("/:id",async(req,res)=>{
     console.log(req.body)
    try{
         const updatedProduct = await productModel.findByIdAndUpdate(req.params.id,{
            $set :req.body
         },{new:true})

         res.status(200).json(updatedProduct)
    }catch(err){
         res.status(200).json(err)
    }
})
module.exports = router