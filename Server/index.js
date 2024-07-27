const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const conn = mysql.createConnection({
    host: "62.72.28.103",
    user: "u908545758_cricket_app",
    password: "Cricket_app&7677",
    database:"u908545758_cricket_app"
});

app.listen(8080, () => {
    console.log("listening");
});

app.post("/signup", (req, res) => {
    const { name, gender, email, number, dob, address, city, state, password } = req.body;

    // Validate all required fields
    if (!name || !gender || !email || !number || !dob || !address || !city || !state || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    conn.query(checkEmailQuery, [email], (err, result) => {
        
        if (result.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // If email doesn't exist, insert the new user
        const insertUserQuery = "INSERT INTO users (name, gender, email, number, dob, address, city, state, password) VALUES (?)";
        const values = [name, gender, email, number, dob, address, city, state, password];
        conn.query(insertUserQuery, [values], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json(data);
        });
    });
});
