import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
    },

    username: {
        type: String,
        min: 3,
        max: 30
    },

    password: {
        type: String,
        min: 6,
        max: 1024
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', UserSchema );

export default User;