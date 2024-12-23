const socketIo = require('socket.io');

function initializeSocket(server) {
    // Create a new Socket.IO instance with CORS settings
    const io = socketIo(server, {
        cors: {
            // origin: 'https://cricfight.in', // Frontend domain
            origin: '*', 
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    // Handle global socket events here if needed
    io.on('connection', (socket) => {
        console.log('A user connected');

        // To join the room for live score update 
        socket.on('joinMatch', (matchId) => {
            console.log("this is matchID", matchId);
            socket.join(matchId);
        });

        // Listen for score updates from the admin/scorer
        socket.on('updateScore', (data) => {
            io.to(data.matchId).emit('scoreUpdate', data);  // Only emit to the specific room
        });

        socket.on('overcompleted', (data) => {
            console.log("This is data --------->", data);
            io.to(data.matchID).emit('showOverCompleteAnimation', data.isoverCompleted);  // Only emit to the specific room
        });


        socket.on('wicketTaken', (data) => {
            io.to(data.matchID).emit('showWicketTakenAnimation', data.isWicketTaken);  // Only emit to the specific room
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;
