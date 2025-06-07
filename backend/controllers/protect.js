import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const protect = async (req, res, next) => {
    try{
    let token = req.cookies.jwt;
    if(token) console.log(token);
    let user = jwt.verify(token, process.env.SECRET);
    console.log(user);
    req.user_id = user._id;
    console.log(req.user_id);
    next();
    } 
    catch (err) {
        console.log(err.message);
        return res.send("You are not authenticated.")
    }
}