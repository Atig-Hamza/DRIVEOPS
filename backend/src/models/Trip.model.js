import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    truck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true,
    },
    start_location: {
        type: String,
        required: true,
        trim: true,
    },
    start_coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    end_location: {
        type: String,
        required: true,
        trim: true,
    },
    end_coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Planned', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Planned',
    },
    notes: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

const Trip = mongoose.model('Trip', tripSchema);

export const CreateTrip = async (tripData) => {
    const trip = new Trip(tripData);
    return await trip.save();
}

export const GetAllTrips = async () => {
    return await Trip.find()
        .populate('driver_id', 'email')
        .populate('truck_id', 'brand model License_plate');
}

export const GetTripById = async (tripId) => {
    return await Trip.findById(tripId)
        .populate('driver_id', 'email')
        .populate('truck_id', 'brand model License_plate');
}

export const UpdateTrip = async (tripId, updateData) => {
    return await Trip.findByIdAndUpdate(tripId, updateData, { new: true })
        .populate('driver_id', 'email')
        .populate('truck_id', 'brand model License_plate');
}

export const DeleteTrip = async (tripId) => {
    return await Trip.findByIdAndDelete(tripId);
}

export default Trip;
