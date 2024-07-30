
const conn = require("../bdcon/dbcon.js");
const bcrypt = require("bcrypt");
const registeruser = (req,res)=>{
    const { name, gender, email, number, dob, address, city, state, password } = req.body;
    if (!name || !gender || !email || !number || !dob || !address || !city || !state || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    // Check if email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    conn.query(checkEmailQuery, [email], (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ msg: "Email already exists" });
        }
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
    });
}


module.exports = registeruser;