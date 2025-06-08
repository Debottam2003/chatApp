import express from 'express'
import { login, register, logoutHandler } from '../controllers/auth.js'
import { protect } from '../controllers/protect.js';
import { message } from '../controllers/message.js';
import { usersHandler } from "../controllers/users.js";

const router = express.Router();

router.route('/').get((req, res) => {
    res.send("Let's Chat");
});

// This is a custom middle ware for calling the json parser function
// function middleware(req, res, next) {
//     let parse = express.json();
//     parse(req, res, next);
// }

router.route('/login').post(express.json(), login);
router.route('/register').post(express.json(), register);
router.route('/logout').get(protect, logoutHandler)
router.route('/message').post(protect, message);
router.route('/users').get(protect, usersHandler);

export default router;