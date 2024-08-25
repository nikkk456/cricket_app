const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require('http');
const { v4: uuidv4 } = require('uuid');
// const initializeSocket = require('./services/friendRequestSocket.js'); // Import the socket service

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
const chats = require("./routes/chats.routes.js");
app.use("/api/friends", friend);
app.use("/api/user", users_route);
app.use("/api/notification",notification);
app.use("/api/chats",chats);

app.post('/api/generate-referral', (req, res) => {
    const userId = req.body.userId; // Assume you have user ID in session or token
    const referralCode = uuidv4();
        res.json({ referralCode });
});

// Initialize Socket.io
const initializeSocket = require('./services/initializeSocket');
const handleChatSockets = require('./services/chatSocket');
const handleFriendRequestSockets = require('./services/friendRequestSocket');
const io = initializeSocket(server);
handleChatSockets(io);
handleFriendRequestSockets(io);


// Start the server
server.listen(8080, () => {
    console.log("listening on port 8080");
});
