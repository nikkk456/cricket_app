const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require('http');
const initializeSocket = require('./services/socketService'); // Import the socket service

const app = express();
const server = http.createServer(app);

app.use(cors());

// Middleware configuration for JSON body parsing
app.use(express.json({ limit: '10mb' }));
// Middleware configuration for URL-encoded body parsing
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - body:`, req.body);
    next();
});

// Routes
const users_route = require("./routes/user.routes.js");
const friend = require("./routes/friends.routes.js");
const notification = require("./routes/notification.routes.js");

app.use("/api/friends", friend);
app.use("/api/user", users_route);
app.use("/api/notification",notification);

// Initialize Socket.io
const io = initializeSocket(server);

// Start the server
server.listen(8080, () => {
    console.log("listening on port 8080");
});
