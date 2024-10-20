const conn = require("../bdcon/dbcon");

const handleNoificationTeam = (io) => {
    io.on("connection", (socket) => {
    socket.on("userOnline", (userId) => {
    // Fetch pending notifications from the database
    const sqlFetchNotifications = `SELECT * FROM notifications WHERE user_id = ? AND notified = FALSE`;
    conn.query(sqlFetchNotifications, [userId], (err, rows) => {
      if (rows.length > 0) {
        rows.forEach((notification) => {
          const roomId = notification.room_id;
  
          // Emit join request to the user for each pending notification
          io.to(socket.id).emit("joinRoomRequest", { roomId });
  
          // Mark the notification as sent
          const sqlUpdateNotification = `UPDATE notifications SET notified = TRUE WHERE id = ?`;
          conn.query(sqlUpdateNotification, [notification.id]);
        });
      }
    });
  });
});
};

module.exports = handleNoificationTeam;