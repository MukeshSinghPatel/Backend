const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected successfully ${connect.connection.host}`);

    } catch (error) {
        console.log("Some Error has occured : ",error.message);
    }
}


module.exports = dbConnect;
