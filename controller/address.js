const Address = require('../models/address');


async function handlerAddAddress(req, res){

    const {fullname,mobileNo,area,city,state,pincode} = req.body;
    if(!fullname || !mobileNo || !area || !city || !state || !pincode){
        return res.json({message:"All Fields are required"});
    }

    try {
        const id = req.userId;
        console.log("Address Added by User",id);
        const userAddress = await Address.create(
            {
              userId:id,  
              fullname :fullname,
              mobileNo:mobileNo,
              area:area,
              city:city,
              state:state,
              pincode:pincode
            }
        ); 

        console.log("Address:- ", userAddress);
        return res.json({message:"Address Added Successfully"});
    } catch (error) {
          console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
    



}

async function handlerGetAddress(req, res){
    try {
        const user = req.userId;
        
        const address = await Address.find({userId:user});

        if(!address){
            return res.json({message:"No address Found"});
        }else{
            return res.json(address);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

async function handlerDeleteAddress(req,res){
    try {
        const isDelete = await Address.findByIdAndDelete({_id : req.params.id});
        return res.json({message:"Address Deleted Successfully",isDelete});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}
async function handlerEditAddress(req, res){
    try {
        
        const id = req.params.id;
        const { fullname, mobileNo, area, city, state, pincode } = req.body;

        if (!fullname && !mobileNo && !area && !city && !state && !pincode) {
            return res.json({ message: "At least one field is required to update" });
        }

        if(!id){
            return res.status(404).json({message:"Id Not found"});
        }else{
            const updateAddress = await Address.findByIdAndUpdate(id,{
                fullname:fullname,
                mobileNo:mobileNo,
                area:area,
                city:city,
                state:state,
                pincode:pincode        
            },
            {new:true}
        );

        if (!updateAddress) {
            return res.json({ message: "Address not found" });
        }

        return res.json({ message: "Address updated successfully", updateAddress });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports = {
    handlerAddAddress,
    handlerGetAddress,
    handlerDeleteAddress,
    handlerEditAddress
}