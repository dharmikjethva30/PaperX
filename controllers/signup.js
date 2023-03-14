const user = require("../models/user")
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const validator = require("email-validator");

const signup = async(req,res) =>{
    try {
        const { email, username} = req.query;
        const valid = validator.validate("test@email.com");
        if(!valid){
            res.status(400).send("Not A valid email")
            return
        }
        const euser = await user.findOne({ email : email})
        if(euser)
        {
            res.status(200).json({
                message: "User already exist"
            })
            return
        }
        const unqname = await user.findOne({user_name : username})
        if (unqname) {
            res.status(200).json({
                message: "Username already exist"
            })
            return
        }

        let ukey = uuidv4();
        console.log(ukey);
        let key = await bcrypt.hash(ukey,10)

        
        const new_user = new user ({
            email : email,
            user_name : username,
            key : key
        })
        await new_user.save()
        res.status(200).json({
            key : ukey,
            message: "User created Successfully"
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = signup