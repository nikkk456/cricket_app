const conn = require("../bdcon/dbcon.js");
const { sendOtpEmail } = require('../services/emailservice.js');
const otpgenerate = async (req,res)=>{
    const { email } = req.body;
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    conn.query(checkEmailQuery, [email], (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ msg: "Email already exists" });
        }
    });
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  try {
    result = await sendOtpEmail(email, otp);
   
    insertquery = "INSERT INTO `otp` ( `user_email`, `value`, `status`) VALUES (?)"
    const values = [email,otp,result];
    conn.query(insertquery,[values],(err,data)=>{
        if (err) {
            return res.status(500).json(err);
        }
    });
    res.status(200).send('OTP sent');
  } catch (error) {
    res.status(500).send('Error sending OTP');
  }
}
module.exports = otpgenerate;