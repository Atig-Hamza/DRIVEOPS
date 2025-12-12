import * as TierModel from '../models/Tier.model.js';

export const createTier = async (tierData) => {
    try {
        return await TierModel.CreateTier(tierData);
    } catch (error) {
        throw new Error(`Error creating tier: ${error.message}`);
    }
};

export const getAllTiers = async () => {
    try {
        return await TierModel.GetAllTiers();
    } catch (error) {
        throw new Error(`Error retrieving tiers: ${error.message}`);
    }
};

export const getTierById = async (tierId) => {
    try {
        const tier = await TierModel.GetTierById(tierId);
        if (!tier) {
            throw new Error('Tier not found');
        }
        return tier;
    } catch (error) {
        throw new Error(`Error retrieving tier: ${error.message}`);
    }
};

export const getTiersByTruckId = async (truckId) => {
    try {
        return await TierModel.GetTiersByTruckId(truckId);
    } catch (error) {
        throw new Error(`Error retrieving tiers for truck: ${error.message}`);
    }
};

export const updateTier = async (tierId, updateData) => {
    try {
        const updatedTier = await TierModel.UpdateTier(tierId, updateData);
        if (!updatedTier) {
            throw new Error('Tier not found');
        }
        return updatedTier;
    } catch (error) {
        throw new Error(`Error updating tier: ${error.message}`);
    }
};

export const deleteTier = async (tierId) => {
    try {
        const deletedTier = await TierModel.DeleteTier(tierId);
        if (!deletedTier) {
            throw new Error('Tier not found');
        }
        return deletedTier;
    } catch (error) {
        throw new Error(`Error deleting tier: ${error.message}`);
    }
};

export default {
    createTier,
    getAllTiers,
    getTierById,
    getTiersByTruckId,
    updateTier,
    deleteTier
};
