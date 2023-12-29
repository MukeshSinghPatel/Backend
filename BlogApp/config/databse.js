const mongoose = require('mongoose')
require("dotenv").config()

const connectDB = async () => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected successfuilly ${connect.connection.host}`)
    }

    catch (error) {
        console.log("Connection Failed")
        console.log(error.message)
        process.exit(1);
    }
}

module.exports = connectDB