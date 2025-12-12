import * as UserModel from '../models/User.model.js';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

export const getAllDrivers = async () => {
    try {
        return await User.find({ role: 'driver' }).select('-password');
    } catch (error) {
        throw new Error(`Error retrieving drivers: ${error.message}`);
    }
};

export const createDriver = async (driverData) => {
    try {
        const existingUser = await UserModel.getUserByEmail(driverData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        const hashedPassword = await bcrypt.hash(driverData.password, 10);
        const user = await UserModel.createUser({
            ...driverData,
            password: hashedPassword,
            role: 'driver'
        });
        
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    } catch (error) {
        throw new Error(`Error creating driver: ${error.message}`);
    }
};

export const updateDriver = async (id, updateData) => {
    try {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        
        const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        if (!user) {
            throw new Error('Driver not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error updating driver: ${error.message}`);
    }
};

export const deleteDriver = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error('Driver not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error deleting driver: ${error.message}`);
    }
};

export default {
    getAllDrivers,
    createDriver,
    updateDriver,
    deleteDriver
};
