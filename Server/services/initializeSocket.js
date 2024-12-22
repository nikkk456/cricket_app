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
            // console.log("this is data", data);
            io.to(data.matchId).emit('scoreUpdate', data);  // Only emit to the specific room
        });
        // socket.on('updateScore', (newScore) => {
        //     liveScore = newScore;
        //     // Emit the new score to all connected clients
        //     io.emit('scoreUpdate', liveScore);
        // });

        socket.on('overcompleted', (data) => {
            io.to(data.matchId).emit('showOverCompleteAnimation', data);  // Only emit to the specific room
        });


        // socket.on('overcompleted', (data)=>{
        //     io.emit('showOverCompleteAnimation', data);
        // })

        // Example of global event listener
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;
