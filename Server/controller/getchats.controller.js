const conn = require("../bdcon/dbcon");

const getchats = (req,res)=>{
 const user_id = req.headers['user_id'];
 getchatquery = "SELECT * FROM messages where (receiver=? and sender= ?) OR (receiver=? and sender= ?)";
 conn.query(getchatquery,[req.body.friend_id,user_id,user_id,req.body.friend_id],(err,result)=>{
    if(err){
        res.status(500).send(err);
    }
    res.status(200).json(result);
 });

}

module.exports = getchats;