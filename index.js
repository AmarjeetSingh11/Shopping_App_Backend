const express = require('express');
const bodyParse = require('body-parser');
const {connectToMongoDB} = require('./connect')
const userRoute = require('./routes/userroutes');
const profileRoute = require('./routes/profileroute');
const productRoute = require('./routes/productroute');
const cartRoute = require('./routes/cartroute');
const addressRoute = require('./routes/addressroute');
const wishlistRoute = require('./routes/wishlistroute');
const authMiddlewares = require('./middlewares/authmiddleware');
const app = express();
const PORT = 3000;

connectToMongoDB('mongodb://127.0.0.1:27017/e-commerce-db').then(
    () => console.log("MongoDB is connected")
).catch(err => console.log(err))



//MiddleWare
app.use(bodyParse.json());

//Routes
app.use('/api/user',userRoute);
app.use('/api/profile',authMiddlewares,profileRoute);
app.use('/api/product',authMiddlewares,productRoute);
app.use('/api/card',authMiddlewares,cartRoute);
app.use('/api/address',authMiddlewares,addressRoute);
app.use('/api/wishlist',authMiddlewares,wishlistRoute);









app.listen(PORT,()=> console.log(`Server Started At ${PORT} Port`));