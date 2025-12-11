import TruckService from '../services/Truck.service.js';

export const CreateTruck = async (req, res) => {
    try {
        const truck = await TruckService.createTruck(req.body);
        res.status(201).json(truck);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const GetAllTrucks = async (req, res) => {
    try {
        const trucks = await TruckService.getAllTrucks();
        res.status(200).json(trucks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetTruckById = async (req, res) => {
    try {
        const truck = await TruckService.getTruckById(req.params.id);
        res.status(200).json(truck);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const UpdateTruck = async (req, res) => {
    try {
        const truck = await TruckService.updateTruck(req.params.id, req.body);
        res.status(200).json(truck);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const DeleteTruck = async (req, res) => {
    try {
        const truck = await TruckService.deleteTruck(req.params.id);
        res.status(200).json({ message: 'Truck deleted successfully', truck });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default {
    CreateTruck,
    GetAllTrucks,
    GetTruckById,
    UpdateTruck,
    DeleteTruck
};
