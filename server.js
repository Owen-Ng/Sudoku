"use strict";
const log = console.log;

const express = require("express");
const app = express();

const cors = require("cors");
 

 

// body-parser middleware
const bodyParser = require("body-parser");
const datetime = require("date-and-time");
app.use(bodyParser.json());
app.use(cors());
// express-session for user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/* Session Handling *** */

// Create session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
            httpOnly: true,
        },
    })
);


app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
  

    const goodPageRoutes = [
        "/" 
    ];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404); 
    }

    res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});