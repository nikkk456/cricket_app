const conn = require("../bdcon/dbcon");
const searchfriend = (req,res)=>{
    searchquery = "Select users.id , name , playing_role from users left join users_profile on users.id = users_profile.user_id where users.id = ? OR users.name Like ? OR number Like ?";
    const searchValue = `%${req.body.searchvalue}%`; // Use '%' for LIKE clauses
    conn.query(searchquery, [req.body.searchvalue, searchValue, searchValue], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ result });
        }
    });
}
module.exports = searchfriend;