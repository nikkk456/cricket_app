
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'your-secret-key';
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

module.exports = verifytoken;