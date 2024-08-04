const conn = require("../bdcon/dbcon");
const bcrypt = require("bcrypt");
const resetpass = (req,res)=>{

    bcrypt.hash(req.body.password,10,(err,hashedpassword)=>{
        if (err) {
            return res.status(500).json(err);
        }
        update_query = "UPDATE users set password = ? WHERE email = ?";
            const value = [
                hashedpassword,
                req.body.email
            ]

            conn.query(update_query,value,(err,result)=>{
                if(err){
                    return res.status(500).json(err);
                }
                return res.status(200).json({msg:"password updated",result});
            })
    });
    
}

module.exports = resetpass;