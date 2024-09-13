const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const config = require('../config/config');

async function handlerVerifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let email;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        email = user.email;
        console.log('Decoded User:', req.user);
       
    });
    const user = await User.findOne({email});

      req.userId = user._id;
    console.log(`User Id:- ${req.userId}`);
    
    next();
}
module.exports = handlerVerifyToken;