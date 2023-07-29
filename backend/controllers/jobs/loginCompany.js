const Company = require('../../models/userCompany');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginCompany = async (req,res) =>{
    try{
        const {email,password} = req.body;
        if(!(email && password))
        {
            res.status(400).send("All input is required");
        }
        const user = await Company.findOne({email});
        
        if(user && (await bcrypt.compare(password,user.password))){
            if(user.isApproved===false){
                return res.status(400).json({message: 'Company not approved yet'});
            }
            const token = jwt.sign({user_id:user._id,email},process.env.JWT_SECRET,{expiresIn:"2h"})
            user._doc.token =token+" company";
            console.log(token);
            return res.status(200).json(user);
        }
        res.status(400).json({message: 'Invalid Credentials'});
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports=loginCompany;