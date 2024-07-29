const mysql = require("mysql");

const conn = mysql.createPool({
    connectionLimit: 10, // Adjust this number based on your needs
    host: "62.72.28.103",
    user: "u908545758_cricket_app",
    password: "Cricket_app&7677",
    database: "u908545758_cricket_app"
});

module.exports = conn;