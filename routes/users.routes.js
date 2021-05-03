const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const db = require("../database");
const { SECRET } = require("../config");

router.get('/', async (req, res) => {
    // get a user by its id
    const token = req.headers["x-access-token"];

    if(token) {
        const decoded = jwt.verify(token, SECRET);

        try {
            const users = await db.query(
                "SELECT * FROM users WHERE id = ?",
                [decoded.id]
            );
            // don't send the password
            const { id, username, fullname } = users[0];
    
            res.status(200).json({
                logged: true,
                id,
                username,
                fullname
            });
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(401).json({
            logged: false
        });
    }
});

module.exports = router;