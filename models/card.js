const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    imgSrc:{
        type:String,
        required:true,
    }
}); 

const cartSchema = mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
      cartItemSchema
    ]
});

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;
