const conn = require("../bdcon/dbcon");

const notificationlist = (req, res) => {
    const executequery = "SELECT * FROM `notification_list` WHERE user_id = ?";
    conn.query(executequery, [req.body.user_id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json({ results });
    });
}

module.exports = notificationlist;
