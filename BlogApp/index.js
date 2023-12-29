const express=require('express')
const app=express();

require("dotenv").config()
const PORT=process.env.PORT || 5000

// MiddleWare

app.use(express.json());

// import routes from Blog Api
const blog=require("./routes/blog");
app.use("/api/v1" ,blog)

app.listen(PORT,()=>{
    console.log(`Server Started Successfully at ${PORT}`)
})

const connectDB=require("./config/databse")
connectDB();

app.get('/',(req,res)=>{
    res.send("This is Home Page")
})
