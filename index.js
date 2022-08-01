const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const basketRoute = require("./routes/basket")
const sellerRoute = require("./routes/seller")
const orderRoute = require("./routes/orders")
const adminRoute = require("./routes/admin")
const sellerRequestRoute = require("./routes/SellerRequest")

const app = express();
app.use(express.json({limit:'50mb'}))

app.use(cors())
app.use(express.json())
app.use("/api/auth/",authRoute)
app.use("/api/product/",productRoute)
app.use("/api/basket/",basketRoute)
app.use("/api/seller/",sellerRoute)
app.use("/api/orders/",orderRoute)
app.use("/api/admin/",adminRoute)
app.use("/api/seller-request/",sellerRequestRoute)
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/farmeasy")
.then(()=>console.log("data base connected"))
.catch((err)=>{
    console.log(err)
})

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Back end server is running...");
});

app.listen(PORT,()=>{
    console.log("Back end server is running....")
})

//"mongodb+srv://yahkoob:farmeasygecw@cluster0.jpxcj6c.mongodb.net/Farmesy?retryWrites=true&w=majority"

//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