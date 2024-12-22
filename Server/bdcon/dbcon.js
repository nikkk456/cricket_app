const mysql = require("mysql");
require('dotenv').config();
const conn = mysql.createPool({
    connectionLimit: 10, // Adjust this number based on your needs
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASES
});

// conn.connect(err => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database');
// });


module.exports = conn;