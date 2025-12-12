import TierService from '../services/Tier.service.js';

export const CreateTier = async (req, res) => {
    try {
        const tier = await TierService.createTier(req.body);
        res.status(201).json(tier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const GetAllTiers = async (req, res) => {
    try {
        const tiers = await TierService.getAllTiers();
        res.status(200).json(tiers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetTierById = async (req, res) => {
    try {
        const tier = await TierService.getTierById(req.params.id);
        res.status(200).json(tier);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const GetTiersByTruckId = async (req, res) => {
    try {
        const tiers = await TierService.getTiersByTruckId(req.params.truckId);
        res.status(200).json(tiers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const UpdateTier = async (req, res) => {
    try {
        const tier = await TierService.updateTier(req.params.id, req.body);
        res.status(200).json(tier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const DeleteTier = async (req, res) => {
    try {
        const tier = await TierService.deleteTier(req.params.id);
        res.status(200).json({ message: 'Tier deleted successfully', tier });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default {
    CreateTier,
    GetAllTiers,
    GetTierById,
    GetTiersByTruckId,
    UpdateTier,
    DeleteTier
};
