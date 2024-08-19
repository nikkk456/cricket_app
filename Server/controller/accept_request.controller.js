const conn = require("../bdcon/dbcon");

const accept_request = (req, res) => {
    const update_status = "UPDATE friend_request SET status = 1 WHERE sender_id = ? and receiver_id = ? ";

    conn.query(update_status,[req.body.sender_id , req.body.user_id],(err,results)=>{
        if(err){
            return res.status(500).json(err);
        }
    });

    const executequery = "SELECT notification_list.*,noti_type.id,friend_request.sender_id,friend_request.status,users.name as sender_name, noti_type.noti_type, noti_type.content FROM `notification_list` left join noti_type on notification_list.notification_type = noti_type.id left join friend_request on friend_request.receiver_id = notification_list.user_id left join users on friend_request.sender_id = users.id  WHERE user_id = ?";
    console.log(executequery);
    console.log(req.body.user_id);
    conn.query(executequery, [req.body.user_id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json({ results });
    });
}

module.exports = accept_request;
