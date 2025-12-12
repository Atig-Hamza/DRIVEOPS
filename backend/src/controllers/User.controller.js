import UserService from '../services/User.service.js';

export const GetAllDrivers = async (req, res) => {
    try {
        const drivers = await UserService.getAllDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    GetAllDrivers
};
