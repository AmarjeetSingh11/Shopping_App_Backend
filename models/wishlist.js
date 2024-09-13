const mongoose = require('mongoose');
const wishlistSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
});

const wishlist = mongoose.model('wishlist',wishlistSchema);
module.exports = wishlist;