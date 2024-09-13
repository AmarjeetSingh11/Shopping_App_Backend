const express = require('express');
const {
    handlerAddToCard,
    handlerGetUserCart,
    handlerRemoveCart,
    handlerDecreaseQty
} = require('../controller/cartcontroller');

const routes = express.Router();


routes.post('/add-to-cart',handlerAddToCard);
routes.get('/get-cart',handlerGetUserCart);
routes.delete('/remove-product/:productId',handlerRemoveCart);
routes.post('/decrease-quantity',handlerDecreaseQty);

module.exports = routes;
