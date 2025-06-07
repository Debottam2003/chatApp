import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilepic: {
        type: String,
        default: ""
    }
},
{timestamps: true}
);

export const users = mongoose.model('users', userSchema);

let messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String
    }
},
{timestamps: true}
);

export const messages = mongoose.model('messages', messageSchema);



