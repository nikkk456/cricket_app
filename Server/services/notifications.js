const conn = require("../bdcon/dbcon");

function handleNoificationTeam(io) {
    io.on("connection", (socket) => {
        console.log("User connected2:", socket.id);
        // Listen for the userOnline event with the userId
        socket.on("userOnline", (userId) => {
            console.log("User online:", userId);
            // Fetch pending notifications from the database
            const sqlFetchNotifications = `SELECT * FROM notifications_group WHERE user_id = ? AND notified = 0`;
            conn.query(sqlFetchNotifications, [userId], (err, rows) => {
                if (err) {
                    console.error("Error fetching notifications:", err);
                    return;
                }
                
                if (rows.length > 0) {
                    rows.forEach((notification) => {
                        const roomId = notification.room_id;
                        // Emit join request to the user for each pending notification
                        io.to(socket.id).emit("joinRoomRequest", {teamName: roomId,roomId: roomId });

                        // Mark the notification as sent
                        const sqlUpdateNotification = `UPDATE notifications_group SET notified = 1 WHERE id = ?`;
                        conn.query(sqlUpdateNotification, [notification.id], (err) => {
                            if (err) {
                                console.error("Error updating notification:", err);
                            }
                        });
                    });
                }
            });
        });
    });
};

module.exports = handleNoificationTeam;
