const conn = require("../bdcon/dbcon.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'your-secret-key';

const loginuser = (req,res)=>{
    const {email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({data:"All fields are required"});
    }
    const queryLogin = "SELECT * FROM users WHERE email = ?";
    conn.query(queryLogin, [email], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (result.length === 0) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const user = result[0];
        // Compare the hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            return res.status(200).json({msg:"login successfully",token:token,user_id:user.id});
        });

    });
}


module.exports = loginuser;