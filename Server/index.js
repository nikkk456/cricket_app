const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Middleware configuration for JSON body parsing
app.use(express.json({ limit: '10mb' }));

// Middleware configuration for URL-encoded body parsing
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware to parse URL-encoded bodies
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - body:`, req.body);
    next();
});

// Routes
const users_route = require("./routes/user.routes.js");
const friend = require("./routes/friends.routes.js");

app.use("/api/friends", friend);
app.use("/api/user", users_route);

app.listen(8080, () => {
    console.log("listening on port 8080");
});
