const mongoose = require("mongoose")
require("dotenv").config();

const dbConnect =async() =>{
    try {
        const connect = await mongoose.connect(process.env.Mongo_Url)
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("CONNECTION FAILED");
        console.log(error.message)
    }
}

module.exports = dbConnect;