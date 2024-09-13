const User = require('../models/user_model');

async function handlerGetProfile(req, res){

    try {
        const { email } = req.user;

        console.log('User Email:', email);

        // Fetch user profile from the database
     const user = await User.findOne({email : email });
     if (!user) {
         return res.status(404).json({ message: 'User not found' });
     } 
     
     const userProfile = {
        name: user.name,
        email: user.email,
    };
    return res.json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" }); 
    }
    
}


module.exports = {
    handlerGetProfile 
}