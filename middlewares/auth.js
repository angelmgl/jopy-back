const jwt = require("jsonwebtoken");
const { searchId } = require("../libs/helpers");
const { SECRET } = require("../config");

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    // the req must have a token
    if(!token) return res.status(403).json({message: "No token provided."});

    const decoded = jwt.verify(token, SECRET);

    try {
        const checkId = await searchId(decoded.id);
        // if the user does'nt exist in the database 
        if(checkId == 0) return res.status(403).json({message: "Token not valid."});
        
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = verifyToken;