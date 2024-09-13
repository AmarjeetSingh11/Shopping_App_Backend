const express = require('express');
const {
    handlerAddAddress,
    handlerGetAddress,
    handlerDeleteAddress,
    handlerEditAddress
} = require('../controller/address');
const routes = express.Router();


routes.post('/add-address',handlerAddAddress);
routes.get('/get-address',handlerGetAddress);
routes.delete('/delete-address/:id',handlerDeleteAddress);
routes.put('/edit-address/:id',handlerEditAddress);

module.exports = routes;