
const conn = require("../bdcon/dbcon");

const groupslist = (req,res)=>{
    const user_id = req.body.user_id;
    const list = "SELECT * FROM `rooms` WHERE room_id in ( SELECT room_id FROM `room_members` WHERE joined = 1 AND friend_id = ?) UNION SELECT * FROM  `rooms` WHERE creator_id = ? ";

    conn.query(list,[user_id,user_id],(err,result)=>{
        if(err){
            res.status(500).json(err);
        }
        res.status(200).json({ result });
    });


}
module.exports = groupslist;