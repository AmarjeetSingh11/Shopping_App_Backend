const Cart = require('../models/card');

//add to cart
async function handlerAddToCard(req, res) {
    try {
        const { productId, title, price, qty, imgSrc } = req.body;
        const userId = req.userId;
        console.log("User ID inside the Cart", userId);

        // Find the user cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            console.log("Cart is nulll");
            cart = new Cart({ userId, items: [] });
        }

        // Find the index of the item in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price += price * qty;
        } else {
            cart.items.push({ productId, title, price, qty, imgSrc });
        }

        await cart.save();
        return res.json({ message: "Product Added to Cart", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

//get user cart
async function handlerGetUserCart(req, res){
    const userId = req.userId;

    try {
        let cart = await Cart.findOne({userId});

        if(!cart){
            return res.status(404).json({message:"Cart not Found"});
        }else{
            return res.json({message:"User Cart", cart})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

//remove product from Cart
async function handlerRemoveCart(req, res){

    const productId = req.params.productId;
    const userId = req.userId;

    if(!productId){
        console.log(productId);
        return res.status(404).json({message:" Product Id is empty"});
    }

    try {
        
        let cart = await Cart.findOne({userId});

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }else{

            cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

            await cart.save();
            return res.json({message:"Product Removed from the Cart"});
            
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

//decrease quantity from card
async function handlerDecreaseQty(req, res) {
    try {
        const { productId, qty,} = req.body;
        const userId = req.userId;
        console.log("User ID inside the Cart", userId);

        // Find the user cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            console.log("Cart is nulll");
            cart = new Cart({ userId, items: [] });
        }

        // Find the index of the item in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {

            const item = cart.items[itemIndex];
            if(item.qty > qty){
                const pricePerUnity = item.price/item.qty;
                item.qty -= qty;
                item.price -= pricePerUnity*qty;
            }else {
                cart.items.splice(itemIndex,1);
            }
        } else {
            return res.json({message:"Invalid Product ID"});
        }

        await cart.save();
        return res.json({ message: "Quantity Decreased Successfully", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}
module.exports = {
    handlerAddToCard,
    handlerGetUserCart,
    handlerRemoveCart,
    handlerDecreaseQty
};
