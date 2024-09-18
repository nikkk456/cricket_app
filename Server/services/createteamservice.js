const conn = require("../bdcon/dbcon");
const handleCreateTeam = (io)=>{
    io.on('connection', (socket) => {
        console.log('A user connected for friend requests');
    socket.on('createRoom', (data, callback) => {
        const roomId = `room_${Date.now()}`; // Generate a unique room ID
        socket.join(roomId);
        
        // Notify the client with the room ID
        callback(roomId);

        // Notify selected friends to join the room
        data.selectedFriends.forEach(friendId => {
            io.to(friendId).emit('joinRoomRequest', { roomId, teamName: data.teamName });
        });
    });

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
}


module.exports = handleCreateTeam;