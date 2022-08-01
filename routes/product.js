const {Router} = require("express")
const userModel = require ("../models/User")
const {status} = require("express/lib/response")
const productModel = require("../models/Product")
const router = require("express").Router()

//CREATE
router.post("/",async (req, res) => {
     console.log(req.body)
    const newProduct = new productModel({
     title:req.body.title,
     category:req.body.category,
     subcat:req.body.subcat,
     image:req.body.image,
     seller:req.body.seller_id,
     price:req.body.price,
     Locality:req.body.Locality

    });
  
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
         res.status(500).json(err)
    }
})

//DELETE

router.delete("/:id",async (req,res)=>{
     try {
          await productModel.findByIdAndDelete(req.params.id)
          res.status(200).json("the product has been deleted")

     } catch (error) {
          res.status.send(500).json("something went wrong...")
     }
})

//GET PRODUCT

router.get("/find/:id",async (req,res)=>{
     try {
          const product =await productModel.findById(req.params.id).populate("seller")

          res.status(200).json(product)

     } catch (err) {
          // res.status.send(500).json(err)
          console.log(err)
     }
})

//GET BY SUBCAT

router.get("/subcat/",async (req,res)=>{
     const qsubCat = req.query.subcat
     try {
          let products;
          if(qsubCat){
              products = await productModel.find({subcat:{
                  $in:[qsubCat]
              }}).populate("seller")
          }
          else{
               products = await productModel.find()
          }

          res.status(200).json(products)
     } catch (err) {
          res.status(500).json(err)
     }
})


//GET ALL PRODUCTS

router.get("/",async (req,res)=>{
     const qCategory = req.query.category
     try {
          let products;
          if(qCategory){
              products = await productModel.find({category:{
                  $in:[qCategory]
              }})
          }
          else{
               products = await productModel.find()
          }

          res.status(200).json(products)
     } catch (error) {
          res.status(500).json(err)
     }
})

//GET BY SELLER
 
router.get("/seller/",async (req,res)=>{
     const id = req.query.id
     console.log(id)
     try {
          let products;
          if(id){
              products = await productModel.find({seller:{
                  $in:[id.toString()]
              }})
          }
          else{
               products = await productModel.find()
          }

          res.status(200).json(products)
     } catch (err) {
          res.status(500).json(err)
     }
})

module.exports = router