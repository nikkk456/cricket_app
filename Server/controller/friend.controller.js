const conn = require("../bdcon/dbcon");

const friendslist = (req, res) => {
    const getlist = `
        SELECT u.id, name, playing_role
        FROM users u
        LEFT JOIN users_profile up ON u.id = up.user_id
        WHERE u.id != ? `;

    const userId = req.body.user_id;
    console.log(userId);
    conn.query(getlist, [userId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ result });
    });
}

module.exports = friendslist;
