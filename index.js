require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

// inits
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // to req and res json files through an API
app.use(passport.initialize());
app.use(passport.session());

// routes


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port: ${app.get('port')}`);
});