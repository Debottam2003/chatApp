import { users } from '../db/models.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

// Login Handler
export const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Provide Proper Credentials"
        });
    }
    else {
        try {
            console.log(email, password);
            let data = await users.findOne({ "email": email }).select('email password _id');
            console.log(data);
            if (password === data.password) {
                console.log("correct password");
                let jwttoken = jwt.sign({ "_id": data._id }, process.env.SECRET);
                res.cookie("jwt", jwttoken, { maxAge: 5 * 60 * 1000, httpOnly: true, sameSite: "strict" });
                res.status(200).json({
                    message: "Welcome back!"
                });
            }
            else {
                res.status(400).json({
                    message: "Invalid Credentials!"
                });
            }
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
};

// Register Handler
export const register = async (req, res) => {
    let { username, email, password, profilepic } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({
            message: "Provide All fields"
        });
    }
    else {
        try {
            console.log(email, password);
            let data = await users.findOne({ "email": email }).select('email createdAt _id');
            console.log(data);
            if (data) {
                return res.status(400).json({
                    message: "Email is already registered"
                });
            }
            else {
                let newuserdata = await users.create({ "username": username, "email": email, "password": password, "profilepic": profilepic });
                console.log(newuserdata);
                let jwttoken = jwt.sign({ "_id": newuserdata._id }, process.env.SECRET);
                res.cookie("jwt", jwttoken, { maxAge: 5 * 60 * 1000, httpOnly: true, sameSite: "strict" });
                res.status(200).json({
                    message: "Welcome to Let's Chat!"
                });
            }
        }
        catch (err) {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
};

// Logout Handler
export const logoutHandler = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        message: "You are logged out."
    });
}