const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // This is redundant if express.json() is already used
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - body:`, req.body);
    next();
});
const JWT_SECRET = 'your-secret-key';

app.listen(8080, () => {
    console.log("listening on port 8080");
});

// Routes
const users_route = require("./routes/user.routes.js");
app.use("/api/user", users_route);



// app.post("/api/user/login",(req,res)=>{
//     console.log(req.body);
// });

// Token verification middleware
const verifytoken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ msg: "No token provided" });
    }
    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(500).json({ msg: "Failed to authenticate token" });
        }
        req.user = decode;
        next();
    });
}
