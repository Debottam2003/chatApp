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





