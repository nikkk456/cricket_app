const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const http = require('http'); // Import http module
const socketIo = require('socket.io');

// Set up the server to work with Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Adjust this according to your client origin
        methods: ["GET", "POST"]
    }
});

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

app.use("/api/friends", friend);
app.use("/api/user", users_route);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a room with the user's ID to handle notifications
    socket.on('joinRoom', (user_id) => {
        socket.join(user_id);
        console.log(`User ${user_id} joined room`);
    });

    // Handle sending friend requests
    socket.on('sendFriendRequest', async (data) => {
        const { sender_id, receiver_id } = data;

        // Insert the friend request into the database (pseudo code)
        // await db.query('INSERT INTO FriendRequests (sender_id, receiver_id) VALUES (?, ?)', [sender_id, receiver_id]);

        // Insert a notification for the receiver (pseudo code)
        // await db.query('INSERT INTO Notifications (user_id, message) VALUES (?, ?)', [receiver_id, `You have a new friend request from user ${sender_id}`]);
        console.log(`You received a new friend request from user ${sender_id}`)
        console.log(`Friend request is being send to  ${receiver_id}`)

        // Emit a notification event to the receiver
        io.to(receiver_id).emit('receiveNotification', {
            sender_id,
            message: `You have a new friend request from user ${sender_id}`
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(8080, () => {
    console.log("listening on port 8080");
});
