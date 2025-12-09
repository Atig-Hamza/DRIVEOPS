import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

async function AdminCredentials() {
    const isAdminExist = await getUserByEmail('admin@driveops.com');
    if (!isAdminExist) {
        const hashPassword = await bcrypt.hash("adminadmin", 10);
        await createUser({
            email: "admin@driveops.com",
            password: hashPassword,
            role: "admin"
        });
        console.log("Admin user created");
    } else {
        console.log("Admin user already exists");
    }
}

AdminCredentials();

export default User;