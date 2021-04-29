const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const { encryptPassword, matchPasswords } = require("../libs/helpers");
const db = require("../database");

const controllers = {
    signup: async (req, res) => {
        const { username, password, fullname } = req.body;

        const newUser = { 
            username, 
            password: await encryptPassword(password),
            fullname 
        };

        const checkUsername = await db.query("SELECT Count(*) FROM users WHERE username = ?", [username]);

        // check if the username already exists 
        if (Object.values(checkUsername[0]) == 0) {
            try {
                const savedUser = await db.query("INSERT INTO users set ?", [newUser]);
                // create a new token for the user
                const token = jwt.sign(
                    { id: savedUser.insertId },
                    SECRET,
                    { expiresIn: 604800 } // 7 days
                    );

                res.status(201).json({
                    id: savedUser.insertId,
                    token
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(400).json("The username " + username + " already exist")
        }
    },

    login: async (req, res) => {
        res.json("login");
    },
}

module.exports = controllers;