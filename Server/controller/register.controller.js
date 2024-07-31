
const conn = require("../bdcon/dbcon.js");
const bcrypt = require("bcrypt");
const registeruser = (req,res)=>{
    const { name, gender, email, number, dob, address, city, state, password,otp } = req.body;
    if (!name || !gender || !email || !number || !dob || !address || !city || !state || !password || !otp) {
        return res.status(400).json({ msg: "Something went wrong " });
    }
    // Check if email already exists
    const checkEmailQuery = "SELECT value FROM otp WHERE user_email = ? order by id desc limit 1";
    conn.query(checkEmailQuery, [email], (err, result) => {
        if (result.length > 0) {
            otp_value = result[0].value;
            if(otp_value==otp){
                bcrypt.hash(password,10,(err,hashedpassword)=>{
                    if (err) {
                        return res.status(500).json(err);
                    }
                // If email doesn't exist, insert the new user
                const insertUserQuery = "INSERT INTO users (name, gender, email, number, dob, address, city, state, password) VALUES (?)";
                const values = [name, gender, email, number, dob, address, city, state, hashedpassword];
                conn.query(insertUserQuery, [values], (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.status(201).json({msg:"Account created successfully"});
                });   
            });
            }else{
                return   res.status(500).json({msg:"invalid otp"});
            } 
        }else{
            return res.status(500).json({msg:"Something went wrong"});
        }
          
    });
}


module.exports = registeruser;