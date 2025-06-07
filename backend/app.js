import express from 'express'
import router from './router/routes.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express();

app.use('/api', router);

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Database connected Successfully.");
        app.listen(process.env.PORT, () => {
            console.log(`Server is runnging on http://localhots:${process.env.PORT}`)
        });
    }
    catch (err) {
        console.log(err.message);
    }
}

dbConnect();