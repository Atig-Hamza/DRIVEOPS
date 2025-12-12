import Application from '../models/Application.model.js';
import Truck from '../models/Truck.model.js';
import Trip from '../models/Trip.model.js';
import User from '../models/User.model.js';

export const GetDashboardStats = async (req, res) => {
    try {
        const [
            pendingApplications,
            activeTrips,
            totalDrivers,
            maintenanceTrucks,
            recentTrips,
            trucksStatus
        ] = await Promise.all([
            Application.countDocuments({ status: 'pending' }),
            Trip.countDocuments({ status: 'In Progress' }),
            User.countDocuments({ role: 'driver' }),
            Truck.countDocuments({ status: 'Maintenance' }),
            Trip.find().sort({ createdAt: -1 }).limit(5).populate('driver_id', 'email').populate('truck_id', 'License_plate'),
            Truck.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ])
        ]);

        const fleetStatus = {
            available: 0,
            inUse: 0,
            maintenance: 0,
            retired: 0
        };

        trucksStatus.forEach(status => {
            if (status._id === 'Available') fleetStatus.available = status.count;
            if (status._id === 'In-use') fleetStatus.inUse = status.count;
            if (status._id === 'Maintenance') fleetStatus.maintenance = status.count;
            if (status._id === 'Retired') fleetStatus.retired = status.count;
        });

        res.status(200).json({
            pendingApplications,
            activeTrips,
            totalDrivers,
            maintenanceTrucks,
            recentTrips,
            fleetStatus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { GetDashboardStats };
