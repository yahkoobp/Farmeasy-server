const {Router} = require("express")
const userModel = require ("../models/User")
const {status} = require("express/lib/response")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv")

const router = require("express").Router()

//REGISTER

router.post("/register", async (req, res) => {
    console.log(req.body)
    const newUser = new userModel({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      phone:req.body.phone,
      password:CryptoJS.AES.encrypt(req.body.password,'farmeasy').toString(),
      city:req.body.city
    })
  
    try {
      const savedUser = await newUser.save();
      res.send(savedUser);
    } catch (error) {
      res.status(500).send(error);
    }
});

//LOGIN

router.post("/login",async (req,res)=>{
  console.log(req.body)
  
  try{
    
    const loggedUser = await userModel.findOne({email:req.body.email,})
      !loggedUser && res.status(401).json("wrong credentials")

    const hashedPassword = CryptoJS.AES.decrypt(loggedUser.password,'farmeasy')
    const dcrptpass = hashedPassword.toString(CryptoJS.enc.Utf8)

    dcrptpass!==req.body.password &&  res.status(401).json("wrong credentials")

    res.status(200).json(loggedUser)
  }catch(err){
    console.log(err)
  }
  
})

module.exports = router