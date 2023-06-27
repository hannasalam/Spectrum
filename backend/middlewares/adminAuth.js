const jwt = require("jsonwebtoken")

const config = process.env

const verifyAdmin = (req,res,next) => {
    let token,role;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        token = req.headers.authorization.split("")[1];
        role=req.headers.authorization.split(" ")[2]
    }

    if(!token && role!=='admin')
        return res.status(403).send("A token is required for authentication")
    try
    {
        const decode = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded
        console.log("decoded :",req.user);
    }
    catch(err){
        return res.status(401).send("Invalid Token");
    }
    return next();
    
}

module.exports = {verifyAdmin}