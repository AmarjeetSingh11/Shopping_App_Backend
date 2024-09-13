const Product = require('../models/product');

async function handlerAddProduct(req, res){

    const {title,desc,price,category,qty,imgSrc} = req.body;
    try {
        
        const product = await Product.create({
            title:title,
            desc:desc,
            price:price,
            category:category,
            qty:qty,
            imgSrc:imgSrc
        })

        return res.json({message:"Product Added SuccessFully",product});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error",}); 
    }
}
async function handlerGetAllProduct(req, res){

    try {
        const product = await Product.find({});
        if(!product){
            return res.status(401).json({message:"No Product Found"});
        }
        
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error",}); 
    }
    

}
async function handlerGetProductById(req, res){

      const productId = req.params.id;
      if(!productId){
        return res.status(400).json("Product ID is required");
      }

    try {
        const product = await Product.findById(productId);
        if(!product){
            return res.status(401).json({message:"No Product Found"});
        }
        
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error",}); 
    }
}
async function handlerUpdateProductById(req, res){

    const productId = req.params.id;
    if(!productId){
      return res.status(400).json("Product ID is required");
    }

  try {
      const product = await Product.findByIdAndUpdate(productId,req.body,{new:true});
      if(!product){
          return res.status(401).json({message:"No Product Found"});
      }
      
      return res.json({message:"Product is Updated Successfully",product});
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server error",}); 
  }
  

}

async function handlerDeleteProductById(req, res){

    const productId = req.params.id;
    if(!productId){
      return res.status(400).json("Product ID is required");
    }

  try {
      const product = await Product.findByIdAndDelete(productId);
      if(!product){
          return res.status(401).json({message:"No Product Found"});
      }
      
      return res.json({message:"Product is Deleted Successfully",product});
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server error",}); 
  }
  

}




module.exports = {
    handlerAddProduct,
    handlerGetAllProduct,
    handlerGetProductById,
    handlerUpdateProductById,
    handlerDeleteProductById
}