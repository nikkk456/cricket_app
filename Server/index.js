const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const conn = require("./dbcon");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const JWT_SECRET = 'your-secret-key';
app.listen(8080, () => {
    console.log("listening");
});

app.post("/signup", (req, res) => {
    const { name, gender, email, number, dob, address, city, state, password } = req.body;

    // Validate all required fields
    if (!name || !gender || !email || !number || !dob || !address || !city || !state || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    conn.query(checkEmailQuery, [email], (err, result) => {
        
        if (result.length > 0) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // If email doesn't exist, insert the new user
        const insertUserQuery = "INSERT INTO users (name, gender, email, number, dob, address, city, state, password) VALUES (?)";
        const values = [name, gender, email, number, dob, address, city, state, password];
        conn.query(insertUserQuery, [values], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json({msg:"Account created successfully"});
        });
    });
});

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({data:"All fields are required"});
    }
    const query_login = "SELECT * From users where email = ? and password = ?";
    const values = [email,password];
    conn.query(query_login,[email , password],(err,result)=>{
       
        if (err) {
            return res.status(500).json(err);
        }
        if(result.length>0){
            const user = result[0];
            const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            // console.log(result);
            return res.status(200).json({msg:"login successfully",token:token});
        }
        return res.status(200).json({msg:"Enter valid crendentials"});

    });
});

const verifytoken = (req,res,next )=>{
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({ msg: "No token provided" });
    }
    jwt.verify(token,JWT_SECRET,(err,decode)=>{
        if (err) {
            return res.status(500).json({ msg: "Failed to authenticate token" });
        }
        res.user = decode;
        next();
    });
}