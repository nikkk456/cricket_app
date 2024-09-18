const conn = require("../bdcon/dbcon");
const { v4: uuidv4 } = require('uuid');

const referral = (req, res) => {
    const user_id = req.body.userId;
    const check_exist = "SELECT referral_link FROM referrals WHERE userid = ?";
    
    conn.query(check_exist, [user_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.length > 0 && result[0].referral_link) {
            return res.status(200).json({ referral_link: result[0].referral_link });
        } else {
            const referral_link = user_id + "_" + uuidv4();
            conn.query('INSERT INTO referrals (userid, referral_link) VALUES (?, ?)', [user_id, referral_link], (err, result) => {
                if (err) {
                    return res.status(500).send("Something went wrong");
                }
                res.status(200).json({referral_link:referral_link });
            });
        }
    });
};

module.exports = referral;
