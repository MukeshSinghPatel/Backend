const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema ({
    name: {
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
        require:true,
    },
    tags: {
        type:String,
        require:true,
    },
    email: {
        type:String,
    }
});

module.exports=mongoose.model("File",fileSchema);
