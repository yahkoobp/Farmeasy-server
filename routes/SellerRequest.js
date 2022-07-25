const {Router} = require("express")
const userModel = require ("../models/User")
const sellerRequestModel = require("../models/SellerRequest")
const productModel = require("../models/Product")
const {status} = require("express/lib/response")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv")
const mongoose = require('mongoose');


const router = require("express").Router()

//REGISTER

router.post("/register", async (req, res) => {
    const newRequest = new sellerRequestModel({
      userId :req.body.u_id,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      address:req.body.address,
      details:req.body.details,
      city:req.body.city
    })
  
    try {
      const savedRequest = await newRequest.save();
      res.send(savedRequest);
    } catch (error) {
      res.status(500).send(error);
    }
});

//GET REQUESTS

router.get("/get-requests",async (req,res)=>{
    const requests = await sellerRequestModel.find()

    try{
        res.status(200).json(requests)
    }catch(err){
        console.log(err)
    }
})

router.put("/:id",async(req,res)=>{
  console.log(req.params.id)
 try{
      const updatedUser = await userModel.findOneAndUpdate({_id:req.params.id},{
         $set :{isSeller:true}
      },{new:true})

      res.status(200).json(updatedUser)
 }catch(err){
      res.status(500).json(err)
 }
})

router.put("/seller/:id",async(req,res)=>{
  console.log(req.params.id)
 try{
      const updatedSellerRequest = await sellerRequestModel.findOneAndUpdate({userId:req.params.id},{
         $set :{isSeller:true}
      },{new:true})

      res.status(200).json(updatedSellerRequest)
 }catch(err){
      res.status(500).json(err)
 }
})

module.exports = router