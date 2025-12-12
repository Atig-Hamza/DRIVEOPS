import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Calendar,
    Clock,
    User,
    Truck,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    X,
    Edit2,
    Trash2
} from 'lucide-react';
import Sidebar from '../../components/SideBare';

const TripRow = ({ trip, onEdit, onDelete }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-50 text-green-700 border-green-100';
            case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'Planned': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="group flex items-center px-4 py-3 hover:bg-neutral-50 rounded-xl transition-all duration-200 border border-transparent hover:border-neutral-100">
            <div className="flex items-center gap-4 w-[25%]">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <MapPin size={20} />
                </div>
                <div className="overflow-hidden">
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 font-serif truncate">
                        <span className="truncate">{trip.start_location}</span>
                        <span className="text-neutral-400">→</span>
                        <span className="truncate">{trip.end_location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1 truncate">
                        <Calendar size={12} />
                        <span>{formatDate(trip.start_time)}</span>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block w-[20%]">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                        <User size={12} />
                    </div>
                    <div className="text-sm font-medium text-neutral-900 truncate">{trip.driver_id?.email || 'Unassigned'}</div>
                </div>
            </div>

            <div className="hidden md:block w-[15%]">
                <div className="flex items-center gap-2">
                    <Truck size={14} className="text-neutral-400" />
                    <div className="text-sm text-neutral-600">{trip.truck_id?.License_plate || 'No Truck'}</div>
                </div>
            </div>

            <div className="hidden md:block w-[15%]">
                <div className="flex flex-col text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-neutral-700">Start:</span>
                        {formatTime(trip.start_time)}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                        <span className="font-medium text-neutral-700">End:</span>
                        {formatTime(trip.end_time)}
                    </div>
                </div>
            </div>

            <div className="w-[15%] flex justify-center">
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(trip.status)}`}>
                    {trip.status}
                </div>
            </div>

            <div className="w-[10%] flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => onEdit(trip)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-all"
                    title="Edit"
                >
                    <Edit2 size={16} />
                </button>
                <button 
                    onClick={() => onDelete(trip._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

const TripModal = ({ isOpen, onClose, onSubmit, initialData, trucks, drivers }) => {
    const [formData, setFormData] = useState({
        start_location: '',
        end_location: '',
        start_time: '',
        end_time: '',
        driver_id: '',
        truck_id: '',
        status: 'Planned',
        notes: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                start_time: initialData.start_time ? new Date(initialData.start_time).toISOString().slice(0, 16) : '',
                end_time: initialData.end_time ? new Date(initialData.end_time).toISOString().slice(0, 16) : '',
                driver_id: initialData.driver_id?._id || initialData.driver_id,
                truck_id: initialData.truck_id?._id || initialData.truck_id
            });
        } else {
            setFormData({
                start_location: '',
                end_location: '',
                start_time: '',
                end_time: '',
                driver_id: '',
                truck_id: '',
                status: 'Planned',
                notes: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold text-neutral-900">
                        {initialData ? 'Edit Trip' : 'Plan New Trip'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                        <X size={20} className="text-neutral-400" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Start Location</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.start_location}
                                onChange={e => setFormData({...formData, start_location: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">End Location</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.end_location}
                                onChange={e => setFormData({...formData, end_location: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Start Time</label>
                            <input 
                                type="datetime-local" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.start_time}
                                onChange={e => setFormData({...formData, start_time: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">End Time</label>
                            <input 
                                type="datetime-local" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.end_time}
                                onChange={e => setFormData({...formData, end_time: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Driver</label>
                            <select 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.driver_id}
                                onChange={e => setFormData({...formData, driver_id: e.target.value})}
                            >
                                <option value="">Select Driver</option>
                                {drivers.map(driver => (
                                    <option key={driver._id} value={driver._id}>{driver.email}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Truck</label>
                            <select 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.truck_id}
                                onChange={e => setFormData({...formData, truck_id: e.target.value})}
                            >
                                <option value="">Select Truck</option>
                                {trucks.map(truck => (
                                    <option key={truck._id} value={truck._id}>{truck.brand} {truck.model} ({truck.License_plate})</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</label>
                            <select 
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="Planned">Planned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Notes</label>
                            <textarea 
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all resize-none"
                                rows="3"
                                value={formData.notes}
                                onChange={e => setFormData({...formData, notes: e.target.value})}
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-sm font-bold text-neutral-600 hover:bg-neutral-50 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-6 py-3 bg-neutral-900 text-white text-sm font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20"
                        >
                            {initialData ? 'Save Changes' : 'Plan Trip'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrip, setEditingTrip] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [tripsRes, trucksRes, driversRes] = await Promise.all([
                axios.get('http://localhost:4000/api/trips', { headers }),
                axios.get('http://localhost:4000/api/trucks', { headers }),
                axios.get('http://localhost:4000/api/users/drivers', { headers })
            ]);

            setTrips(tripsRes.data);
            setTrucks(trucksRes.data);
            setDrivers(driversRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = () => {
        setEditingTrip(null);
        setIsModalOpen(true);
    };

    const handleEdit = (trip) => {
        setEditingTrip(trip);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:4000/api/trips/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchData();
            } catch (err) {
                console.error('Error deleting trip:', err);
                alert('Failed to delete trip');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            if (editingTrip) {
                await axios.put(`http://localhost:4000/api/trips/${editingTrip._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:4000/api/trips', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            console.error('Error saving trip:', err);
            alert('Failed to save trip');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex">
            <Sidebar />
            <div className="flex-1 ml-[280px]">
                <div className="p-8 w-full max-w-[1600px] mx-auto font-sans">           
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">Trip Management</h1>
                            <div className="flex items-center gap-2 mt-2 text-neutral-500 text-sm">
                                <MapPin size={14} />
                                <span>Schedule and monitor fleet trips</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block group">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search trips..." 
                                    className="pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent w-72 transition-all shadow-sm"
                                />
                            </div>
                            <button className="p-3 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all relative shadow-sm flex items-center gap-2">
                                <Filter size={18} />
                                <span className="text-sm font-medium hidden md:block">Filter</span>
                            </button>
                            <button 
                                onClick={handleAdd}
                                className="px-5 py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20 flex items-center gap-2"
                            >
                                <Plus size={18} />
                                <span>Plan Trip</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-serif font-bold text-neutral-900">Scheduled Trips</h2>
                                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold">{trips.length} Total</span>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="hidden md:flex items-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-50 mb-2">
                                <div className="w-[25%]">Route & Date</div>
                                <div className="w-[20%]">Driver</div>
                                <div className="w-[15%]">Vehicle</div>
                                <div className="w-[15%]">Schedule</div>
                                <div className="w-[15%] text-center">Status</div>
                                <div className="w-[10%] text-right">Actions</div>
                            </div>

                            <div className="space-y-1">
                                {trips.map((trip) => (
                                    <TripRow 
                                        key={trip._id}
                                        trip={trip}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                                {trips.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                                            <MapPin size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900">No trips scheduled</h3>
                                        <p className="text-neutral-500 text-sm mt-1">Plan a new trip to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isModalOpen && (
                            <TripModal 
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onSubmit={handleSubmit}
                                initialData={editingTrip}
                                trucks={trucks}
                                drivers={drivers}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Trips;
