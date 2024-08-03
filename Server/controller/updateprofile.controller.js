
const conn = require("../bdcon/dbcon.js");
const profile_update = (req,res)=>{
    const userid = req.headers['userid'];
    const checkexisting = "SELECT * FROM users_profile WHERE user_id = ?";
    
    conn.query(checkexisting, [userid], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        const values = [
            req.body.playing_role,
            req.body.preferred_playing_position,
            req.body.batting_style,
            req.body.bowling_style,
            req.body.height,
            req.body.weight,
            req.body.experience,
            req.body.highest_level_played,
            req.body.previous_Team,
            req.body.achievement,
            req.body.availability_days,
            req.body.timing,
            req.body.instagram_links,
            req.body.facebook_links,
            userid
        ];
    
        if (data.length > 0) {  // User profile exists, perform update
            const update_query = `UPDATE users_profile SET 
                playing_role = ?, 
                preferred_playing_position = ?, 
                batting_style = ?, 
                bowling_style = ?, 
                height = ?, 
                weight = ?, 
                experience = ?, 
                highest_level_played = ?, 
                previous_Team = ?, 
                achievement = ?, 
                availability_days = ?, 
                timing = ?, 
                instagram_links = ?, 
                facebook_links = ? 
                WHERE user_id = ?`;
    
            conn.query(update_query, values, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json({ message: "User profile updated successfully", result });
            });
        } else {  // User profile does not exist, perform insert
            const insert_query = `INSERT INTO users_profile 
                (playing_role, preferred_playing_position, batting_style, bowling_style, height, weight, experience, highest_level_played, previous_Team, achievement, availability_days, timing, instagram_links, facebook_links, user_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
            conn.query(insert_query, values, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json({ message: "User profile created successfully", result });
            });
        }
    });
}

module.exports = profile_update