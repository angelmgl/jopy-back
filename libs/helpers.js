const bcrypt = require("bcryptjs");

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

module.exports = helpers;
