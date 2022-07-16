const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const basketRoute = require("./routes/basket")
const sellerRoute = require("./routes/seller")
const orderRoute = require("./routes/orders")

const app = express();
app.use(express.json({limit:'50mb'}))

app.use(cors())
app.use(express.json())
app.use("/api/auth/",authRoute)
app.use("/api/product/",productRoute)
app.use("/api/basket/",basketRoute)
app.use("/api/seller/",sellerRoute)
app.use("/api/orders/",orderRoute)

const PORT = 5000;

mongoose.connect("mongodb+srv://yahkoob:farmeasygecw@cluster0.jpxcj6c.mongodb.net/Farmesy?retryWrites=true&w=majority")
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



