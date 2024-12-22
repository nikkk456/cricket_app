const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(cors({
    // origin: 'https://cricfight.in', // Allow only this origin for CORS
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));


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
const groups = require("./routes/groups.routes.js");
app.use("/api/friends", friend);
app.use("/api/user", users_route);
app.use("/api/notification",notification);
app.use("/api/chats",chats);
app.use("/api/groups",groups);


// Initialize Socket.io
const initializeSocket = require('./services/initializeSocket');
const handleChatSockets = require('./services/chatSocket');
const handleFriendRequestSockets = require('./services/friendRequestSocket');
const handlecreateteam = require('./services/createteamservice.js');
const notification_group = require('./services/notifications.js');
const io = initializeSocket(server);
notification_group(io);
handleChatSockets(io);
handleFriendRequestSockets(io);
handlecreateteam(io);


// Start the server
server.listen(8080, () => {
    console.log("listening on port 8080");
});
