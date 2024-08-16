const conn = require("../bdcon/dbcon");
const socketIo = require('socket.io');

function initializeSocket(server) {
    const io = socketIo(server, {
        cors: {
            origin: "*", // Adjust this according to your client origin
            methods: ["GET", "POST"]
        }
    });

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

            try {
                // Check if a friend request already exists
                const checkExistingQuery = "SELECT COUNT(*) as allcount FROM friend_request WHERE sender_id = ? AND receiver_id = ?";
                const checking = await new Promise((resolve, reject) => {
                    conn.query(checkExistingQuery, [sender_id, receiver_id], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(results[0].allcount);
                    });
                });

                if (checking > 0) {
                    io.to(sender_id).emit('requeststatus', {
                        receiver_id,
                        message: 'Request already sent'
                    });
                    return;
                }

                // Insert the friend request
                const insertQueryFriendRe = "INSERT INTO `friend_request` (`sender_id`, `receiver_id`) VALUES (?, ?)";
                const getnoti_typeid = "SELECT id from noti_type WHERE noti_type = ?";
                const noti_type = 'Friend request';
                const getresult = await new Promise((resolve,reject)=>{
                    conn.query(getnoti_typeid,[noti_type],(err,result)=>{
                        if(err){
                            console.log("hii");
                            console.error(err);
                            return reject(err);
                        }
                        resolve(result[0].id);
                    });
                });

                const insertQueryNoti = "INSERT INTO `notification_list` (`notification_type`,`user_id`, `cause_noti`) VALUES (?, ?, ?)";
                const content = "Received friend request from user ";
                const friendResult = await new Promise((resolve, reject) => {
                    conn.query(insertQueryFriendRe, [sender_id, receiver_id], (err, res) => {
                        if (err) {
                            console.error("Error inserting friend request:", err);
                            return reject(err);
                        }
                        resolve(res);
                    });
                });

                const notiResult = await new Promise((resolve, reject) => {
                    conn.query(insertQueryNoti, [getresult, receiver_id, sender_id], (err, res) => {
                        if (err) {
                            console.error("Error inserting notification:", err);
                            return reject(err);
                        }
                        resolve(res);
                    });
                });

                if (friendResult.affectedRows && notiResult.affectedRows) {
                    io.to(sender_id).emit('requeststatus', {
                        receiver_id,
                        message: 'Request sent successfully'
                    });

                    io.to(receiver_id).emit('receiveNotification', {
                        sender_id,
                        message: `You have a new friend request from user ${sender_id}`
                    });
                } else {
                    io.to(sender_id).emit('requeststatus', {
                        receiver_id,
                        message: 'Something went wrong'
                    });
                }
            } catch (err) {
                console.error("An error occurred:", err);
                io.to(sender_id).emit('requeststatus', {
                    receiver_id,
                    message: 'An error occurred while processing your request'
                });
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;
