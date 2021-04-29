const jwt = require("jsonwebtoken");

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
                res.status(201).json({id: savedUser.insertId});
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