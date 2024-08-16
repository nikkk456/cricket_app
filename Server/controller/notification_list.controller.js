const conn = require("../bdcon/dbcon");

const notificationlist = (req, res) => {
    const executequery = "SELECT * FROM `notification_list` left join noti_type on notification_list.notification_type = noti_type.id WHERE user_id = ?";
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
