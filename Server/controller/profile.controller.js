
const conn = require("../bdcon/dbcon.js");
const profile = (req,res)=>{
    userquery = "SELECT * FROM `users` join users_profile on users.id = users_profile.user_id  WHERE users.id = ?";
    
    conn.query(userquery,[req.body.user_id],(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(201).json(data);
    });
}

module.exports = profile;