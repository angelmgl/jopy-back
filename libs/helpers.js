const bcrypt = require("bcryptjs");
const db = require("../database");

const helpers = {};

helpers.encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // generate an algorithm to encrypt the pw
        const hash = await bcrypt.hash(password, salt); // apply the salt to the password
        return hash;
    } catch (error) {
        console.log(error);
    }
};

helpers.matchPasswords = async (password, receivedPassword) => {
    try {
        const res = await bcrypt.compare(password, receivedPassword);
        return res; // returns a boolean
    } catch (error) {
        console.log(error);
    }
};

helpers.searchUsername = async (username) => {
    try {
        // search if already exist that username in the database
        const checkUsername = await db.query(
            "SELECT Count(*) FROM users WHERE username = ?",
            [username]
        );
        // return 1 or 0
        return Object.values(checkUsername[0]);
    } catch (error) {
        console.log(error);
    }
};

helpers.searchId = async (id) => {
    try {
        // search if that id exist in the database
        const checkId = await db.query(
            "SELECT Count(*) FROM users WHERE id = ?",
            [id]
        );
        // return 1 or 0
        return Object.values(checkId[0]);
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;
