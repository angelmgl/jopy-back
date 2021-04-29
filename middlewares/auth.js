const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const { id, user_id } = req.body; // user id and transactions.user_id

    // the req must have a token
    if(!token) return res.status(403).json({message: "No token provided."});

    const decoder = jwt.verify(token, SECRET);
    
    // token id must be equal to user id
    if(id != decoder.id) return res.status(403).json({message: "Wrong user id"});

    // transactions.user_id must be equal to user id
    if(id != user_id) return res.status(403).json({message: "Wrong user id"});

    next();
}

module.exports = verifyToken;