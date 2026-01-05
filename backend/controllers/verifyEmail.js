const User = require("../models/userModel");

const verifyEmail = async(req, res) =>{

    try{
        const { token } = req.query;

        if(!token){
            return res.status(400).json({
                message :`no token passed`
            })
        }

        const user = await User.findOne({where :{ verificationToken : token}})

        if(!user){
            return res.status(400).json({
                message : "invalid token"
            })
        }

        //check token expire
        if(user.verificationTokenExpires < new Date()){
            return res.status(400).json({
                message: "token expired"
            })
        }

        //modify row data
        user.isVerified = true,
        user.verificationToken = null,
        user.verificationTokenExpires = null

        await user.save();

        return res.status(201).json({
            message: " woah! email verified successfully"
        })

    }catch(error){
        return res.json({
            message: "server side error",
            error: error.message
        })
    }

}


module.exports = verifyEmail;
