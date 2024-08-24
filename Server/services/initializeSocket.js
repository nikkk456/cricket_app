const socketIo = require('socket.io');

function initializeSocket(server) {
    // Create a new Socket.IO instance with CORS settings
    const io = socketIo(server, {
        cors: {
            origin: "*", // Adjust this according to your client origin
            methods: ["GET", "POST"]
        }
    });

    // Handle global socket events here if needed
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Example of global event listener
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;
