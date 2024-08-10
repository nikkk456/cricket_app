const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // This is redundant if express.json() is already used
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - body:`, req.body);
    next();
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});

// Routes
const users_route = require("./routes/user.routes.js");
const friend = require("./routes/friends.routes.js");

app.use("/api/friends",friend);
app.use("/api/user", users_route);


