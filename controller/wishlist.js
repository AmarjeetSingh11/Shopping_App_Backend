const Wishlist = require('../models/wishlist');
const Product = require('../models/product');
async function handlerAddWishlist(req, res){

    const userId = req.userId;
    const productId = req.body.productId;

    try {
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId,productId });
        } else {
            const itemExists = wishlist.items.some(item => item.productId.equals(productId));
            if (!itemExists) {
                wishlist.items.push({ productId });
            }
        }
        await wishlist.save();
        res.json({ message: 'Product added to wishlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

async function handlerGetWishlist(req, res){

    const userId = req.userId;
    
    try {
        const wishlist = await Wishlist.find({userId});
        if(!wishlist){
            return res.status(404).json({message:"Empty Wishlist"});
        }else{
        const productIds = wishlist.map(item => item.productId);
        // Fetch products based on the product IDs
        const products = await Product.find({ _id: { $in: productIds } });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.json({ message: "Wishlist Items", products })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports = {
    handlerAddWishlist,
    handlerGetWishlist
}