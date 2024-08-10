const conn = require("../bdcon/dbcon");

const friendslist = (req,res)=>{
    getlist = "Select users.id , name , playing_role from users left join users_profile on users.id = users_profile.user_id where users.id != ?";
    conn.query(getlist, req.body.user_id , (err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json({result});
    })
}

module.exports  = friendslist;