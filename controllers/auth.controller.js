const { encryptPassword, matchPasswords } = require("../libs/helpers");

const controllers = {
    signup: async (req, res) => {
        const { username, password, fullname } = req.body;
        
        console.log(req.body);
    },

    login: async (req, res) => {
        res.json("login");
    },
}

module.exports = controllers;