const conn = require("../bdcon/dbcon");

const myfriends = (req, res) => {
    
        const executequery = "SELECT receiver_id as cur_user ,sender_id as friend_id ,users.name as friend_name FROM `friend_request` left join users On friend_request.sender_id = users.id WHERE receiver_id = ?  AND status = 1 UNION SELECT receiver_id as cur_user ,sender_id as friend_id ,users.name as friend_name FROM `friend_request` left join users On friend_request.receiver_id = users.id WHERE sender_id = ? AND status = 1;";
        console.log(executequery);
        console.log(req.body.user_id);
        conn.query(executequery, [req.body.user_id,req.body.user_id], (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json({ results });
        });

    
}

module.exports = myfriends;
