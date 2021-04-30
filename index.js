require("dotenv").config();
require("./database");

const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const helmet = require("helmet");

// inits
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // to req and res json files through an API

// routes
app.use(require("./routes"));
app.use("/api/transactions", require("./routes/transactions.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port: ${app.get('port')}`);
});