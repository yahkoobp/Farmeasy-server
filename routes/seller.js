const {Router} = require("express")
const userModel = require ("../models/User")
const sellerModel = require("../models/Seller")
const productModel = require("../models/Product")
const {status} = require("express/lib/response")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv")
const mongoose = require('mongoose');



const router = require("express").Router()

//REGISTER

router.post("/seller-register", async (req, res) => {
    console.log(req.body)
    const newSeller = new sellerModel(req.body)
  
    try {
      const savedSeller = await newSeller.save();
      res.send(savedSeller);
    } catch (error) {
      res.status(500).send(error);
    }
});
//ADD PRODUCTS

router.post("/add-products/:id",async(req,res)=>{
  const sellerId = mongoose.Types.ObjectId(req.params.id)
    
  const updatedSeller = await sellerModel.findOneAndUpdate({userId:sellerId},{$push :{products:req.body}})
  //   console.log(newBasket)
  try{
      const savedSeller = await updatedSeller.save()
      res.status(200).json(savedSeller)
  }catch(err){
      res.status(500).json(err)
  }
})

//ADD ORDERS

router.post("/orders/:id",async(req,res)=>{
  console.log(req.body)
  const sellerId = mongoose.Types.ObjectId(req.params.id)
  
  const newOrder = await sellerModel.findOneAndUpdate({userId:sellerId},{$push :{orders:req.body}})
    console.log(newOrder)
  try{
      const savedOrder = await newOrder.save()
      res.status(200).json(savedOrder)
  }catch(err){
      res.status(500).json(err)
  }
})

//GET ORDERS

router.get("/orders/find/:id",async(req,res)=>{
  const sellerOrders = await sellerModel.findOne({userId:req.params.id})
  try{
    res.status(200).json(sellerOrders)
  }catch(err){
    console.log(err)
  }
})

// MARK AS DELIVERED

// router.put("/delivery/:id",async(req,res) =>{
 
//   console.log(req.params.id)
//   const updatedProduct = await productModel.findByIdAndUpdate(req.params.id,{$set :{isDelivered:true}} )
  
//   try{
//     const savedProduct = await updatedProduct.save()
//     res.status(200).json(savedProduct)
//     console.log(savedProduct)
// }catch(err){
//     res.status(500).json(err)
// }
// })

router.put("/delivery/:id/",async(req,res) =>{
  const pid = req.params.id.toString()
  console.log(pid)
  console.log(req.query.user)
  const newOrder = await userModel.findOneAndUpdate({_id:req.query.user,orders:{$elemMatch:{_id:pid}}},{$set:{"orders.$.isDelivered":true}})
  console.log(newOrder)
//   try{
//     const savedOrder = await newOrder.save()
//     res.status(200).json(savedOrder)
//     console.log(savedOrder)
// }catch(err){
//     res.status(500).json(err)
// }
})

//GET DELEVERY INFO

router.put("/deliveryInfo/:seller/",async(req,res) =>{
  const uid = req.query.user.toString()
  const sellerId = mongoose.Types.ObjectId(req.params.seller)
  
  const orderInfo = await sellerModel.findOneAndUpdate({userId:sellerId,orders:{$elemMatch:{user_id:uid}}},{$set:{"orders.$.isDelivered":true}})
  console.log(orderInfo)

  try{
    res.status(200).json(orderInfo)
  }catch(err){
    res.status(500).json(err)                                      
  }
})


//ADD REVIEW

router.post("/rating/:id",async(req,res)=>{
  console.log(req.body)
  const sellerId = mongoose.Types.ObjectId(req.params.id)
  
  const newOrder = await sellerModel.findOneAndUpdate({userId:sellerId},{$push:{ratings:req.body.rating}})
    console.log(newOrder)
  try{
      const savedOrder = await newOrder.save()
      res.status(200).json(savedOrder)
  }catch(err){
      res.status(500).json(err)
  }
})

router.put("/totalrating/:id",async(req,res)=>{
  console.log(req.body)
  const sellerId = mongoose.Types.ObjectId(req.params.id)
  
  const newOrder = await sellerModel.findOneAndUpdate({userId:sellerId},{$set:{totalRating:req.body.totalRate}})
    console.log(newOrder)
  try{
      const savedOrder = await newOrder.save()
      res.status(200).json(savedOrder)
  }catch(err){
      res.status(500).json(err)
  }
})

router.get("/get-seller/:id",async(req,res)=>{
  // const sellerId = mongoose.Types.ObjectId(req.params.id)
  // console.log(sellerId)

  const seller = await sellerModel.findOne({userId:req.params.id})
  try{
    res.status(200).json(seller)
  }catch(err){
    console.log(err)
  }
})




module.exports = router