// App create
const express = require("express")
const app = express();

// Port
require ("dotenv").config()
const PORT = process.env.PORT || 4000;

// Add Middleware
app.use(express.json());
const fileupload = require ("express-fileupload")
app.use(fileupload);

// Connect to Database
const dbConnect = require('./config/database')
dbConnect();

// Connect to Cloudinary
const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect();

// Mount the Api Route
const Upload = require('./routes/FileUpload')
app.use('/api/v1/upload',Upload)

// Activate Server
app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})