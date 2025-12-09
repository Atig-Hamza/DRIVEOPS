import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'driver'],
        default: 'driver',
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export default User;