const conn = require("../bdcon/dbcon");

const roomchats = (req,res)=>{
 const room_id = req.body.room_id;
 getchatquery = "SELECT * FROM messages where receiver=? ";
 conn.query(getchatquery,[req.body.room_id],(err,result)=>{
    if(err){
        res.status(500).send(err);
    }
    res.status(200).json(result);
 });

}

module.exports = roomchats;