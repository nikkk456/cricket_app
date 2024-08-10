const conn = require("../bdcon/dbcon");

const friendslist = (req, res) => {
    const getlist = `
        SELECT u.id, name, playing_role
        FROM users u
        JOIN users_profile up ON u.id = up.user_id
        WHERE u.city = (
            SELECT city
            FROM users
            WHERE users.id = ?
        )
        AND u.id != ?
    `;

    const userId = req.body.user_id;

    conn.query(getlist, [userId, userId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ result });
    });
}

module.exports = friendslist;
