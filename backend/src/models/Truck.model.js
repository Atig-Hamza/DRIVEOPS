import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
    License_plate: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    vin: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    capacity_kg: {
        type: Number,
        required: true,
    },
    fuel_type: {
        type: String,
        required: true,
        trim: true,
        enum: ["Diesel", "Gasoline", "Electric"],
    },
    current_mileage: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Available", "In-use", "Maintenance", "Retired"],
        default: "Available",
    },
    assigned_driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        default: null,
    },
    last_service_date: {
        type: Date,
    },
    next_service_due: {
        type: Date,
    },
    tires_status: [
        {
            position: String,
            wear_percent: Number,
            last_change_date: Date,
        }
    ],
    notes: {
        type: String,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});


const Truck = mongoose.model("Truck", truckSchema);

export const CreateTruck = async (truckData) => {
    const truck = new Truck(truckData);
    return await truck.save();
}

export const GetAllTrucks = async () => {
    return await Truck.find();
}

export const GetTruckById = async (truckId) => {
    return await Truck.findById(truckId);
}

export const UpdateTruck = async (truckId, updateData) => {
    updateData.updated_at = Date.now();
    return await Truck.findByIdAndUpdate(truckId, updateData, { new: true });
}

export const DeleteTruck = async (truckId) => {
    return await Truck.findByIdAndDelete(truckId);
}

export default Truck;