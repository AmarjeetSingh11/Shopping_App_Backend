const express = require('express');
const {
    handlerAddWishlist,
    handlerGetWishlist
} = require('../controller/wishlist');
const routes = express.Router();

routes.post('/add-wishlist',handlerAddWishlist);
routes.get('/get-wishlist',handlerGetWishlist);

module.exports = routes;
