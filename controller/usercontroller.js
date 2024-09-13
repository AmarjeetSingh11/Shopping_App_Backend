const User = require('../models/user_model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function handlerRegisterUser(req, res){
    const body = req.body;
    if(!body.name || !body.email || !body.pass){
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Check if the student already exists
    const existingUser = await User.findOne({ where: { email:body.email } });

    if (existingUser) {
        return res.status(409).json({ message: "User is alread registered" 
      });
     }
     // Hash the password
     const hashedPassword = await bcrypt.hash(body.pass, 10);

     const result = await User.create({
        name:body.name,
        email:body.email,
        pass:hashedPassword,
     });
     console.log("Result:- ", result);
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in Registering User:", error);
        return res.status(500).json({ message: "Internal Server error" }); 
    }
}
async function handerLoginUser(req, res){
    const body = req.body;
    const {email,pass} = req.body;
    if(!body.email || !body.pass){
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        
        const isUser = await User.findOne({email:email});
        if(!isUser){
            return res.status(401).json({message:"Invalid Email or Password (Inside the istudent IF block)"})
        }

        const passwordMatch = await bcrypt.compare(pass, isUser.pass);
        if(isUser && passwordMatch){

             // Generate JWT token
    const token = jwt.sign({ email: email }, config.jwtSecret,{ expiresIn: '7d'});

    return res.json({ accessToken: token });

        }else{
            return res.status(401).json({ message: "Email & Password wrong" });
        }

    } catch (error) {
        console.error("Error in Login the User:- ",error);
        return res.status(500).json({message:"Internal Server Error"}); 
    }

}



module.exports = {
    handlerRegisterUser,
    handerLoginUser
}