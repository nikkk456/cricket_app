const conn = require("../bdcon/dbcon");

// A map to store userId and their associated socketId
let userSessions = {}; 

const handleCreateTeam = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected for group creation");
    console.log("Socket ID:", socket.id);

    // Assuming userId is passed during connection via handshake query
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSessions[userId] = socket.id; // Map userId to socketId
      console.log(`User connected: userId=${userId}, socketId=${socket.id}`);
    }

    // Handle room creation event
    socket.on("createRoom", (data, callback) => {
      const roomId = `room_${Date.now()}`; // Generate a unique room ID
      const userId = data.created_by;
      const teamName = data.teamName;
      const selectedFriends = data.selectedFriends; // Array of friend IDs

      // Insert room into `rooms` table
      const sqlInsertRoom = `INSERT INTO rooms (room_id, team_name, creator_id) VALUES (?, ?, ?)`;
      conn.query(sqlInsertRoom, [roomId, teamName, userId], (err, result) => {
        if (err) {
          console.error("Error creating room:", err);
          return callback({ success: false, message: "Database error" });
        }

        // Add each friend to `room_members` table
        selectedFriends.forEach((friendId) => {
          const sqlInsertMember = `INSERT INTO room_members (room_id, friend_id, is_online) VALUES (?, ?, ?)`;

          // Check if the friend is connected (i.e., map userId to socketId)
          const friendSocketId = getSocketIdByUserId(friendId);

          if (friendSocketId) {
            // Friend is online, notify via socket
            conn.query(sqlInsertMember, [roomId, friendId, true], (err) => {
              if (!err) {
                console.log(`Notifying friend ${friendId} (socketId: ${friendSocketId}) to join the room`);
                io.to(friendSocketId).emit("joinRoomRequest", {
                  roomId,
                  teamName,
                  message: 'A user invited you to join the group'
                });
              } else {
                console.error("Error adding friend to room_members:", err);
              }
            });
          } else {
            // Friend is offline, store notification in `notifications` table
            conn.query(sqlInsertMember, [roomId, friendId, false], (err) => {
              if (!err) {
                const sqlInsertNotification = `INSERT INTO notifications_group (user_id, room_id) VALUES (?, ?)`;
                conn.query(sqlInsertNotification, [friendId, roomId], (err) => {
                  if (err) {
                    console.error("Error storing notification:", err);
                  } else {
                    console.log(`Notification stored for offline friend ${friendId}`);
                  }
                });
              } else {
                console.error("Error adding friend to room_members:", err);
              }
            });
          }
        });

        // Respond with room creation success
        callback({ success: true, roomId });
      });
    });

    // Handle user joining a room
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
      // Update the room_members table to reflect the user joining
      const userId =  socket.handshake.query.userId; // Use your logic to get the actual user ID
      const sqlUpdateMember = `UPDATE room_members SET joined = 1 WHERE room_id = ? AND friend_id = ?`;
      conn.query(sqlUpdateMember, [roomId, userId], (err) => {
        if (err) {
          console.error("Error updating room membership:", err);
        }
      });
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId) {
        delete userSessions[userId]; // Remove user from sessions
      }
    });
  });
};

// Export the function
module.exports = handleCreateTeam;

// Helper function to get socketId from userId
function getSocketIdByUserId(userId) {
  return userSessions[userId] || null; // Return socketId if user is online
}
