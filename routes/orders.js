const basketModel = require ("../models/Basket")
const {status} = require("express/lib/response")
const User = require("../models/User")
const Order = require("../models/Orders")
const router = require("express").Router()


//ADD TO ORDERS

router.post("/:id",async(req,res)=>{
  
    
    const newOrder = await User.findOneAndUpdate({_id:req.params.id},{$push :{orders:req.body.product}})
      
    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

//ADD TO ORDERS

// router.post("/:id",async(req,res)=>{
  
    
//     const newOrder = await new Order({
//         userId:req.params._id,
//         products:req.body.bag
//     })
      
//     try{
//         const savedOrder = await newOrder.save()
//         res.status(200).json(savedOrder)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })




//GET USER ORDERS

router.get("/find/:userId",async (req,res)=>{
   
    try{
        const user =await User.findOne({_id:req.params.userId})
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//DELETE BASKET
router.put("/delete/:uid/",async (req,res)=>{
   
    try {
         const deletedCart = await User.findOneAndUpdate({_id:req.params.uid},{$set:{cartProducts:[]}})
         await deletedCart.save()
         res.status(200).json(deletedCart)

    } catch (error) {
         res.status.send(500).json(err)
    }
})
 

module.exports = router