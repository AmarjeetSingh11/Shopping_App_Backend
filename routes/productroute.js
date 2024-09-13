const express = require('express');

const {
    handlerAddProduct,
    handlerGetAllProduct,
    handlerGetProductById,
    handlerUpdateProductById,
    handlerDeleteProductById
} = require('../controller/productcontroller');

const routes = express.Router();


routes.post('/addproduct',handlerAddProduct);
routes.get('/getproduct',handlerGetAllProduct);
routes.get('/getproductById/:id',handlerGetProductById);
routes.put('/updateProductById/:id',handlerUpdateProductById);
routes.delete('/deleteProductById/:id',handlerDeleteProductById);

module.exports = routes;