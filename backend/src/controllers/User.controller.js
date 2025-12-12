import UserService from '../services/User.service.js';

export const GetAllDrivers = async (req, res) => {
    try {
        const drivers = await UserService.getAllDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const CreateDriver = async (req, res) => {
    try {
        const driver = await UserService.createDriver(req.body);
        res.status(201).json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const UpdateDriver = async (req, res) => {
    try {
        const driver = await UserService.updateDriver(req.params.id, req.body);
        res.status(200).json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const DeleteDriver = async (req, res) => {
    try {
        await UserService.deleteDriver(req.params.id);
        res.status(200).json({ message: 'Driver deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default {
    GetAllDrivers,
    CreateDriver,
    UpdateDriver,
    DeleteDriver
};
