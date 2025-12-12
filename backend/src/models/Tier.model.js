import mongoose from 'mongoose';

const TierSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
        enum: ["Front Left", "Front Right", "Rear Left", "Rear Right"],
    },
    condition: {
        type: String,
        required: true,
        enum: ["New", "Good", "Worn", "Needs Replacement"],
        default: "Good",
    },
    truck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck",
        required: true,
    }
}, {
    timestamps: true
});

const Tier = mongoose.model('Tier', TierSchema);

export const CreateTier = async (tierData) => {
    const tier = new Tier(tierData);
    return await tier.save();
}

export const GetAllTiers = async () => {
    return await Tier.find().populate('truck_id');
}

export const GetTierById = async (tierId) => {
    return await Tier.findById(tierId).populate('truck_id');
}

export const GetTiersByTruckId = async (truckId) => {
    return await Tier.find({ truck_id: truckId });
}

export const UpdateTier = async (tierId, updateData) => {
    return await Tier.findByIdAndUpdate(tierId, updateData, { new: true });
}

export const DeleteTier = async (tierId) => {
    return await Tier.findByIdAndDelete(tierId);
}

export default Tier;