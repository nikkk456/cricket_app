const conn = require("../bdcon/dbcon");

function handleChatSockets(io) {
    io.on('connection', (socket) => {
        console.log('A user connected to chat. Socket ID:', socket.id);

        // Join room
        socket.on('joinRoom', ({ user_id, chat_id }) => {
            if (user_id && chat_id) {
                socket.join(chat_id);
                console.log(`User ${user_id} joined room ${chat_id}`);
            } else {
                console.warn('No user ID or chat ID provided for joinRoom');
            }
        });

        // Handle sending and receiving messages
        socket.on('sendMessage', async (data) => {
            console.log(data);
            const { sender, receiver, messageText, timestamp } = data;

            try {
                if (!sender || !receiver || !messageText || !timestamp) {
                    throw new Error('Invalid message data');
                }

                // Generate chat room ID
                var  chatRoom = data.room_id;
                if(!data.room_id){
                    var chatRoom = [sender, receiver].sort().join('_'); // Example: "5_16"
                }
                // Save message to database
                const insertMessageQuery = "INSERT INTO messages (sender, receiver, messageText, timestamp) VALUES (?, ?, ?, ?)";
                await new Promise((resolve, reject) => {
                    if(data.room_id){
                        conn.query(insertMessageQuery, [sender, chatRoom, messageText, timestamp], (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                    });
                }else{
                    conn.query(insertMessageQuery, [sender, receiver, messageText, timestamp], (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                });
                }
                });

                // Emit message to the chat room
                io.to(chatRoom).emit('receiveMessage', { sender, messageText, timestamp });
                // Notify sender of successful sending
                // io.to(sender).emit('sendStatus', { status: 'Message sent successfully' });
                // Notify receiver of new message
                io.to(receiver).emit('receiveStatus', { status: 'New message received', sender, messageText, timestamp });
                console.log(`Message sent to room ${chatRoom}`);
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
