import { users } from '../db/models.js'
export const usersHandler = async (req, res) => {
    try{
    let usersData = await users.find({id: {$ne: req.user_id}}).select('email _id');
    console.log(usersData);
    res.status(200).json({
        message: usersData
    });
    } catch(err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
}