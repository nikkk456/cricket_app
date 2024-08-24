const conn = require("../bdcon/dbcon");

function handleFriendRequestSockets(io) {
    io.on('connection', (socket) => {
        console.log('A user connected for friend requests');

        // Handle sending friend requests
        socket.on('sendFriendRequest', async (data) => {
            const { sender_id, receiver_id } = data;

            try {
                // Check if a friend request already exists
                const checkExistingQuery = "SELECT COUNT(*) as allcount FROM friend_request WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)";
                const checking = await new Promise((resolve, reject) => {
                    conn.query(checkExistingQuery, [sender_id, receiver_id, receiver_id, sender_id], (err, results) => {
                        if (err) return reject(err);
                        resolve(results[0].allcount);
                    });
                });

                if (checking > 0) {
                    io.to(sender_id).emit('requeststatus', { receiver_id, message: 'Request already sent' });
                    return;
                }

                // Insert the friend request
                const insertQueryFriendRe = "INSERT INTO friend_request (sender_id, receiver_id) VALUES (?, ?)";
                const getnoti_typeid = "SELECT id FROM noti_type WHERE noti_type = ?";
                const noti_type = 'Friend request';
                const getresult = await new Promise((resolve, reject) => {
                    conn.query(getnoti_typeid, [noti_type], (err, result) => {
                        if (err) return reject(err);
                        resolve(result[0].id);
                    });
                });

                const insertQueryNoti = "INSERT INTO notification_list (notification_type, user_id, cause_noti) VALUES (?, ?, ?)";
                const content = "Received friend request from user ";
                const friendResult = await new Promise((resolve, reject) => {
                    conn.query(insertQueryFriendRe, [sender_id, receiver_id], (err, res) => {
                        if (err) return reject(err);
                        resolve(res);
                    });
                });

                const notiResult = await new Promise((resolve, reject) => {
                    conn.query(insertQueryNoti, [getresult, receiver_id, sender_id], (err, res) => {
                        if (err) return reject(err);
                        resolve(res);
                    });
                });

                if (friendResult.affectedRows && notiResult.affectedRows) {
                    io.to(sender_id).emit('requeststatus', { receiver_id, message: 'Request sent successfully' });
                    io.to(receiver_id).emit('receiveNotification', { sender_id, message: `You have a new friend request from user ${sender_id}` });
                } else {
                    io.to(sender_id).emit('requeststatus', { receiver_id, message: 'Something went wrong' });
                }
            } catch (err) {
                console.error("An error occurred:", err);
                io.to(sender_id).emit('requeststatus', { receiver_id, message: 'An error occurred while processing your request' });
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected from friend requests');
        });
    });
}

module.exports = handleFriendRequestSockets;
