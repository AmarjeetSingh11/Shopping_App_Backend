const express = require('express');
const {
    handlerGetProfile
} = require('../controller/profilecontroller')

const routes = express.Router();


routes.get('/getprofile',handlerGetProfile);




module.exports = routes;