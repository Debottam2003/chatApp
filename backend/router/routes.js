import express from 'express'
import { login, register } from '../controllers/auth.js'

const router = express.Router();

router.route('/').get((req, res) => {
    res.send("Let's Chat");
});

router.route('/login').post(express.json(), login);

router.route('/register').post(express.json(), register);

router.route('/logout/:userid').get((req, res) => {
    res.send("Let's Chat");
});

export default router;