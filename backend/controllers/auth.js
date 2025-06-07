import { users } from '../db/models.js'
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
            let data = await users.findOne({ "email": email }, { "email": 1, "password": 1, "_id": 0 });
            console.log(data);
            if (password === data.password) {
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
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
};

export const register = async (req, res) => {
    let { email, password, profilepic } = req.body;
    if (!email || !password) {
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
                await users.create({ "email": email, "password": password, "profilepic": profilepic });
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