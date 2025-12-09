import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../models/User.model.js';
import config from '../config/config.js';

export const register = async (email, password, role) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = await createUser({ email, password, role });
    return newUser;
}

export const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        config.jwtSecret,
        { expiresIn: '1h' }
    );
    return { token, user };
}

export default { register, login };