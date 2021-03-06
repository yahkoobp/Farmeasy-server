const {Router} = require("express")
const userModel = require ("../models/User")
const sellerModel = require("../models/Seller")
const {status} = require("express/lib/response")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv")
const mongoose = require('mongoose');


const router = require("express").Router()

//REGISTER

router.post("/seller-register", async (req, res) => {
    const newSeller = new sellerModel({
      userId :req.body.u_id,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      address:req.body.address,
      details:req.body.details,
      city:req.body.city
    })
  
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






module.exports = router