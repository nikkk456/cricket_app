const conn = require("../bdcon/dbcon");

const notificationlist = (req, res) => {
    const executequery = "SELECT notification_list.*,noti_type.id,friend_request.sender_id,friend_request.status,users.name AS sender_name,noti_type.noti_type,noti_type.content FROM notification_list LEFT JOIN noti_type ON notification_list.notification_type = noti_type.id LEFT JOIN friend_request ON friend_request.receiver_id = notification_list.user_id AND friend_request.sender_id = notification_list.cause_noti LEFT JOIN users ON friend_request.sender_id = users.id WHERE notification_list.user_id = ?"
    console.log(executequery);
    console.log(req.body.user_id);
    conn.query(executequery, [req.body.user_id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json({ results });
    });
}

module.exports = notificationlist;
