const conn = require("../bdcon/dbcon");

const searchfriend = (req, res) => {
    // SQL query to search for friends
    const searchQuery = `
        SELECT users.id, name, playing_role, profilePicture 
        FROM users 
        LEFT JOIN users_profile ON users.id = users_profile.user_id 
        WHERE (users.id = ? OR users.name LIKE ? OR number LIKE ?) 
        AND users.id != ?
    `;

    // Extract user ID from request headers
    const userId = req.headers['userid'];
    // Sanitize and format search value
    const searchValue = `%${req.body.searchvalue}%`;
        // Print the query and the values used for debugging
        console.log("SQL Query:", searchQuery);
        console.log("Query Parameters:", [req.body.searchvalue, searchValue, searchValue, userId]);
    
    // Execute query
    conn.query(searchQuery, [req.body.searchvalue, searchValue, searchValue, userId], (err, result) => {
        if (err) {
            // Send error response with status 500
            res.status(500).json({ error: 'An error occurred while searching for friends.' });
        } else {
            // Send success response with the query result
            res.status(200).json({ result });
        }
    });
};

module.exports = searchfriend;
