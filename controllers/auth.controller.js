const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const {
    encryptPassword,
    matchPasswords,
    searchUsername,
} = require("../libs/helpers");
const db = require("../database");

const controllers = {
    signup: async (req, res) => {
        const { username, password, fullname } = req.body;

        const newUser = {
            username,
            password: await encryptPassword(password),
            fullname,
        };

        const checkUsername = await searchUsername(username);

        // check if the username already exists
        if (checkUsername == 0) {
            try {
                const savedUser = await db.query("INSERT INTO users set ?", [
                    newUser,
                ]);
                // create a new token for the user
                const token = jwt.sign(
                    { id: savedUser.insertId },
                    SECRET,
                    { expiresIn: 604800 } // 7 days
                );

                res.status(201).json({
                    success: true,
                    id: savedUser.insertId,
                    token,
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(400).json({
                success: false,
                message: "The username " + username + " already exist",
                token: null
            });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        const user = await db.query("SELECT * FROM users WHERE username = ?", [
            username,
        ]);

        // if the user does'nt exist...
        if (!user[0]) {
            res.status(400).json({
                success: false,
                message: "The username " + username + " does'nt exist",
                token: null,
            });
        } else {
            const match = await matchPasswords(password, user[0].password);
            // compare passwords
            if (match) {
                console.log(user[0]);
                const token = jwt.sign({ id: user[0].id }, SECRET, {
                    expiresIn: 604800,
                });
                res.status(200).json({
                    success: true,
                    id: user[0].id,
                    token,
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Wrong password",
                    token: null,
                });
            }
        }
    },
};

module.exports = controllers;
