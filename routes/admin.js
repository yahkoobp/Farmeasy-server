const {Router} = require("express")
const {status} = require("express/lib/response")
const dotenv = require("dotenv")
const adminModel = require("../models/Admin")
const userModel = require("../models/User")
const sellerModel = require("../models/Seller")

const router = require("express").Router()

router.post("/login",async (req,res)=>{
    console.log(req.body)
    
    try{
      
      const loggedAdmin = await adminModel.findOne({email:req.body.email,})
        !loggedAdmin && res.status(401).json("wrong credentials")
        loggedAdmin.password!=req.body.password &&  res.status(401).json("wrong credentials")
  
      res.status(200).json(loggedAdmin)
    }catch(err){
      console.log(err)
    }
    
  })

  router.get("/get-users",async (req,res)=>{
    const users = await userModel.find()
    console.log(users)
    try{
      res.status(200).json(users)
    }catch(err){
      console.log(err)
    }
  })

  router.get("/get-sellers",async(req,res)=>{
    const sellers = await sellerModel.find()
    try{
      res.status(200).json(sellers)
    }catch(err){
      console.log(err)
    }
  })
  
  module.exports = router