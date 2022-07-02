const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/auth/",authRoute)
app.use("/api/product/",productRoute)

const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/farmeasy")
.then(()=>console.log("data base connected"))
.catch((err)=>{
    console.log("something went wrong...")
})

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Back end server is running...");
});

app.listen(PORT,()=>{
    console.log("Back end server is running....")
})



