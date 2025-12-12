import * as UserModel from '../models/User.model.js';
import User from '../models/User.model.js';

export const getAllDrivers = async () => {
    try {
        return await User.find({ role: 'driver' }).select('-password');
    } catch (error) {
        throw new Error(`Error retrieving drivers: ${error.message}`);
    }
};

export default {
    getAllDrivers
};
