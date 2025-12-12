import * as TripModel from '../models/Trip.model.js';

export const createTrip = async (tripData) => {
    try {
        // Basic validation could go here (e.g. check if truck is available)
        return await TripModel.CreateTrip(tripData);
    } catch (error) {
        throw new Error(`Error creating trip: ${error.message}`);
    }
};

export const getAllTrips = async () => {
    try {
        return await TripModel.GetAllTrips();
    } catch (error) {
        throw new Error(`Error retrieving trips: ${error.message}`);
    }
};

export const getTripById = async (tripId) => {
    try {
        const trip = await TripModel.GetTripById(tripId);
        if (!trip) {
            throw new Error('Trip not found');
        }
        return trip;
    } catch (error) {
        throw new Error(`Error retrieving trip: ${error.message}`);
    }
};

export const updateTrip = async (tripId, updateData) => {
    try {
        const updatedTrip = await TripModel.UpdateTrip(tripId, updateData);
        if (!updatedTrip) {
            throw new Error('Trip not found');
        }
        return updatedTrip;
    } catch (error) {
        throw new Error(`Error updating trip: ${error.message}`);
    }
};

export const deleteTrip = async (tripId) => {
    try {
        const deletedTrip = await TripModel.DeleteTrip(tripId);
        if (!deletedTrip) {
            throw new Error('Trip not found');
        }
        return deletedTrip;
    } catch (error) {
        throw new Error(`Error deleting trip: ${error.message}`);
    }
};

export default {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip
};
