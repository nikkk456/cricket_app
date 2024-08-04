const conn = require("../bdcon/dbcon.js");
const { sendOtpEmail } = require('../services/emailservice.js');

const forgot_pass = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ msg: "Email is required" });
    }
    // Check if the user exists
    const checkexistence = "SELECT * FROM users WHERE email = ?";
    conn.query(checkexistence, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: 'Internal server error', error: err });
        }

        if (result.length > 0) {
            const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
            // Send OTP email
            sendOtpEmail(email, otp).then(() => {
                // Insert OTP into the database
                const insertquery = "INSERT INTO otp (user_email, value, status) VALUES (?, ?, ?)";
                const values = [email, otp, '1'];
                conn.query(insertquery, values, (err, data) => {
                    if (err) {
                        return res.status(500).json({ msg: 'Internal server error', error: err });
                    }
                    return res.status(200).send('OTP sent');
                });
            }).catch((error) => {
                return res.status(500).send('Error sending OTP');
            });
        } else {
            return res.status(404).json({ msg: "Account not found" });
        }
    });
};


module.exports = forgot_pass;