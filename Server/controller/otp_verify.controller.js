
const conn = require("../bdcon/dbcon");
const otpVerify = (req,res)=>{
    const checkEmailQuery = "SELECT value FROM otp WHERE user_email = ? order by id desc limit 1";
    conn.query(checkEmailQuery, [req.body.email], (err, result) => {
        if(err){
            return   res.status(500).json(err);
        }
        if (result.length > 0) {
            otp_value = result[0].value;
        }
        if(req.body.otp==otp_value){
            return res.status(200).json({msg:"verified"});
        }else{
            return res.status(400).json({msg:"wrong otp"});
        }
    });
}
module.exports = otpVerify