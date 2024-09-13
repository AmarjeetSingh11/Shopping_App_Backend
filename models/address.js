const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
    },
    fullname:{
        type:String,
        required:true,
    },
    mobileNo:{
        type:Number,
        required:true,
        unquie:true
    },
    area:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    }

})


const address = mongoose.model('address',addressSchema);
module.exports = address;