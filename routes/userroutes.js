const express = require('express');
const {
    handlerRegisterUser,
    handerLoginUser
} = require('../controller/usercontroller')
const routes = express.Router();

routes.post('/register',handlerRegisterUser);
routes.post('/login',handerLoginUser);




module.exports = routes;