const conn = require("../bdcon/dbcon");

const friendslist = (req, res) => {
    const getlist = `
        SELECT u.id, name, playing_role,profilePicture
        FROM users u
        LEFT JOIN users_profile up ON u.id = up.user_id
        WHERE u.id != ? AND u.id in (SELECT sender_id from friend_request WHERE receiver_id = ? AND Status !=0 UNION SELECT receiver_id from friend_request WHERE sender_id = ? AND status !=0 ) `;

    const userId = req.body.user_id;
    console.log(userId);
    conn.query(getlist, [userId,userId,userId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json({ result });
    });
}

module.exports = friendslist;
