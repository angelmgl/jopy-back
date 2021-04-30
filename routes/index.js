const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to Jopy API! See the documentation here: https://github.com/angelmgl/jopy-back");
});

module.exports = router;