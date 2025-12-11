import * as TruckModel from '../models/Truck.model.js';

export const createTruck = async (truckData) => {
    try {
        return await TruckModel.CreateTruck(truckData);
    } catch (error) {
        throw new Error(`Error creating truck: ${error.message}`);
    }
};

export const getAllTrucks = async () => {
    try {
        return await TruckModel.GetAllTrucks();
    } catch (error) {
        throw new Error(`Error retrieving trucks: ${error.message}`);
    }
};

export const getTruckById = async (truckId) => {
    try {
        const truck = await TruckModel.GetTruckById(truckId);
        if (!truck) {
            throw new Error('Truck not found');
        }
        return truck;
    } catch (error) {
        throw new Error(`Error retrieving truck: ${error.message}`);
    }
};

export const updateTruck = async (truckId, updateData) => {
    try {
        const updatedTruck = await TruckModel.UpdateTruck(truckId, updateData);
        if (!updatedTruck) {
            throw new Error('Truck not found');
        }
        return updatedTruck;
    } catch (error) {
        throw new Error(`Error updating truck: ${error.message}`);
    }
};

export const deleteTruck = async (truckId) => {
    try {
        const deletedTruck = await TruckModel.DeleteTruck(truckId);
        if (!deletedTruck) {
            throw new Error('Truck not found');
        }
        return deletedTruck;
    } catch (error) {
        throw new Error(`Error deleting truck: ${error.message}`);
    }
};

export default {
    createTruck,
    getAllTrucks,
    getTruckById,
    updateTruck,
    deleteTruck
};