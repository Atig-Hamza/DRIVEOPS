import * as TruckModel from '../models/Truck.model.js';
import * as TierModel from '../models/Tier.model.js';

export const createTruck = async (truckData) => {
    try {
        const truck = await TruckModel.CreateTruck(truckData);
        
        const positions = ["Front Left", "Front Right", "Rear Left", "Rear Right"];
        const tierPromises = positions.map(position => {
            return TierModel.CreateTier({
                position: position,
                condition: "Good",
                truck_id: truck._id
            });
        });
        
        await Promise.all(tierPromises);
        
        return truck;
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