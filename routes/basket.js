const basketModel = require ("../models/Basket")
const {status} = require("express/lib/response")
const User = require("../models/User")
const router = require("express").Router()


//ADD TO BASKET

router.post("/:id",async(req,res)=>{
    
    const newBasket = await User.findOneAndUpdate({_id:req.params.id},{$push :{cartProducts:req.body}},{upsert:true})
    //   console.log(newBasket)
    try{
        const savedBasket = await newBasket.save()
        res.status(200).json(savedBasket)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET BASKET COUNT

router.put("/count/:id",async(req,res)=>{
    console.log(req.body)
   try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set :req.body}
            ,{new:true})

        res.status(200).json(updatedUser.basketCount)
   }catch(err){
        res.status(500).json(err)
   }
})


//GET USER BASKET

router.get("/find/:userId",async (req,res)=>{
    try{
        const user =await User.findOne({_id:req.params.userId})
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE BASKET
router.put("/delete/:uid/",async (req,res)=>{
    console.log(req.params.uid)
    const productid = req.query.pid 
    console.log(productid)
    try {
         const deletedCart = await User.findOneAndUpdate({_id:req.params.uid},{$pull:{cartProducts:{_id:productid.toString()}}},{new:true})
         await deletedCart.save()
         res.status(200).json(deletedCart)

    } catch (error) {
         res.status.send(500).json(err)
    }
})
 

module.exports = router