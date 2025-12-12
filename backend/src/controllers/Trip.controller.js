import TripService from '../services/Trip.service.js';

export const CreateTrip = async (req, res) => {
    try {
        const trip = await TripService.createTrip(req.body);
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const GetAllTrips = async (req, res) => {
    try {
        const trips = await TripService.getAllTrips();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetTripById = async (req, res) => {
    try {
        const trip = await TripService.getTripById(req.params.id);
        res.status(200).json(trip);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const UpdateTrip = async (req, res) => {
    try {
        const trip = await TripService.updateTrip(req.params.id, req.body);
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const DeleteTrip = async (req, res) => {
    try {
        const trip = await TripService.deleteTrip(req.params.id);
        res.status(200).json({ message: 'Trip deleted successfully', trip });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default {
    CreateTrip,
    GetAllTrips,
    GetTripById,
    UpdateTrip,
    DeleteTrip
};
