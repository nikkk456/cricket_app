const conn = require("../bdcon/dbcon");

function handleChatSockets(io) {
    io.on('connection', (socket) => {
        console.log('A user connected to chat');
        // join room
        socket.on('joinRoom', (user_id) => {
            if (user_id) {
                socket.join(user_id);
                console.log(`User ${user_id} joined room`);
            } else {
                console.warn('No user ID provided for joinRoom');
            }
        });

        // Handle sending and receiving messages
        socket.on('sendMessage', async (data) => {
            const { sender, receiver, messageText, timestamp } = data;

            try {
                // Save message to database
                const insertMessageQuery = "INSERT INTO messages (sender, receiver, messageText, timestamp) VALUES (?, ?, ?, ?)";
                await new Promise((resolve, reject) => {
                    conn.query(insertMessageQuery, [sender, receiver, messageText, timestamp], (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });
                });

                // Emit message to the receiver
                console.log(receiver);
                io.to(receiver).emit('receiveMessage', { sender, messageText, timestamp });
                io.to(sender).emit('receivestatus', { sender, messageText, timestamp });
                console.log(`Message sent to room ${receiver}`);
            } catch (err) {
                console.error("Error handling message:", err);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected from chat');
        });
    });
}

module.exports = handleChatSockets;
