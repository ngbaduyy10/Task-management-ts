import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    userToken: String,
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema, 'user');

export default User;