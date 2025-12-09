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


export default { register };