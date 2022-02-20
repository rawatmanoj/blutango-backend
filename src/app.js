require("dotenv").config()
const express = require("express");
const db = require('./config/database')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

db.connect();

const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'contenttype',
        'Accept',
        'X-Access-Token',
        'Authorization',
        'authorization'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "*",
    // preflightContinue: true,
};

//use cors middleware
app.use(cors(options));


app.use(bodyParser.urlencoded(
    {
        extended: false,
        limit: "50mb",
    },
));
app.use(bodyParser.json({ limit: "50mb" }));

// commonRoutes(app)




require("./routes")(app);


module.exports = app;