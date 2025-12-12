import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Truck,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Fuel,
    Calendar,
    Gauge,
    AlertCircle,
    CheckCircle2,
    Wrench,
    Trash2,
    Edit2,
    X
} from 'lucide-react';

const TireStatusVisual = ({ tiers }) => {
    const getTireColor = (condition) => {
        switch (condition) {
            case 'New': return '#3B82F6';
            case 'Good': return '#22C55E';
            case 'Worn': return '#EAB308'; 
            case 'Needs Replacement': return '#EF4444'; 
            default: return '#D1D5DB'; 
        }
    };

    const getTireByPosition = (pos) => tiers?.find(t => t.position === pos)?.condition;

    return (
        <div className="relative w-12 h-16 mx-auto group/tire cursor-help">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tire:block w-48 bg-neutral-900 text-white text-xs rounded-lg p-2 z-10 shadow-xl">
                <div className="font-bold mb-1 border-b border-neutral-700 pb-1">Tire Status</div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{backgroundColor: getTireColor(getTireByPosition('Front Left'))}}></div> FL</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{backgroundColor: getTireColor(getTireByPosition('Front Right'))}}></div> FR</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{backgroundColor: getTireColor(getTireByPosition('Rear Left'))}}></div> RL</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{backgroundColor: getTireColor(getTireByPosition('Rear Right'))}}></div> RR</div>
                </div>
            </div>

            {/* Truck Body */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-16 bg-neutral-200 rounded-md border border-neutral-300"></div>
            
            {/* Cab */}
            <div className="absolute left-1/2 top-1 -translate-x-1/2 w-4 h-4 bg-neutral-300 rounded-sm border border-neutral-400"></div>

            {/* Front Left Tire */}
            <div 
                className="absolute left-1 top-2 w-2 h-4 rounded-sm border border-black/10 transition-colors"
                style={{ backgroundColor: getTireColor(getTireByPosition('Front Left')) }}
            ></div>

            {/* Front Right Tire */}
            <div 
                className="absolute right-1 top-2 w-2 h-4 rounded-sm border border-black/10 transition-colors"
                style={{ backgroundColor: getTireColor(getTireByPosition('Front Right')) }}
            ></div>

            {/* Rear Left Tire */}
            <div 
                className="absolute left-1 bottom-2 w-2 h-4 rounded-sm border border-black/10 transition-colors"
                style={{ backgroundColor: getTireColor(getTireByPosition('Rear Left')) }}
            ></div>

            {/* Rear Right Tire */}
            <div 
                className="absolute right-1 bottom-2 w-2 h-4 rounded-sm border border-black/10 transition-colors"
                style={{ backgroundColor: getTireColor(getTireByPosition('Rear Right')) }}
            ></div>
        </div>
    );
};

const TruckRow = ({ truck, onEdit, onDelete }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-50 text-green-700 border-green-100';
            case 'In-use': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'Maintenance': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'Retired': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    const getTierColor = (condition) => {
        switch (condition) {
            case 'New': return 'bg-blue-500';
            case 'Good': return 'bg-green-500';
            case 'Worn': return 'bg-yellow-500';
            case 'Needs Replacement': return 'bg-red-500';
            default: return 'bg-gray-300';
        }
    };

    return (
        <div className="group flex items-center px-4 py-3 hover:bg-neutral-50 rounded-xl transition-all duration-200 border border-transparent hover:border-neutral-100">
            <div className="flex items-center gap-4 w-[20%]">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Truck size={20} />
                </div>
                <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-neutral-900 font-serif truncate">{truck.brand} {truck.model}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1 truncate">
                        <span className="font-mono">{truck.License_plate}</span>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block w-[12%]">
                <div className="text-sm font-medium text-neutral-900">{truck.type}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{truck.year}</div>
            </div>

            <div className="hidden md:block w-[12%]">
                <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <Fuel size={14} className="text-neutral-400" />
                    {truck.fuel_type}
                </div>
            </div>

            <div className="hidden md:block w-[12%]">
                <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <Gauge size={14} className="text-neutral-400" />
                    {truck.current_mileage.toLocaleString()} km
                </div>
            </div>

            <div className="hidden md:flex w-[14%] justify-center items-center">
                {truck.tiers && truck.tiers.length > 0 ? (
                    <TireStatusVisual tiers={truck.tiers} />
                ) : (
                    <span className="text-xs text-neutral-400">No tiers</span>
                )}
            </div>

            <div className="w-[15%] flex justify-center">
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(truck.status)}`}>
                    {truck.status}
                </div>
            </div>

            <div className="w-[15%] flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => onEdit(truck)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-all"
                    title="Edit"
                >
                    <Edit2 size={16} />
                </button>
                <button 
                    onClick={() => onDelete(truck._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

const TruckModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        License_plate: '',
        vin: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        type: '',
        capacity_kg: '',
        fuel_type: 'Diesel',
        current_mileage: 0,
        status: 'Available'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                License_plate: '',
                vin: '',
                brand: '',
                model: '',
                year: new Date().getFullYear(),
                type: '',
                capacity_kg: '',
                fuel_type: 'Diesel',
                current_mileage: 0,
                status: 'Available'
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
                        {initialData ? 'Edit Truck' : 'Add New Truck'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                        <X size={20} className="text-neutral-400" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Brand</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.brand}
                                onChange={e => setFormData({...formData, brand: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Model</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.model}
                                onChange={e => setFormData({...formData, model: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">License Plate</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.License_plate}
                                onChange={e => setFormData({...formData, License_plate: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">VIN</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.vin}
                                onChange={e => setFormData({...formData, vin: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Year</label>
                            <input 
                                type="number" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.year}
                                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Type</label>
                            <select 
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.type}
                                onChange={e => setFormData({...formData, type: e.target.value})}
                            >
                                <option value="">Select Type</option>
                                <option value="Semi-Trailer">Semi-Trailer</option>
                                <option value="Box Truck">Box Truck</option>
                                <option value="Flatbed">Flatbed</option>
                                <option value="Tanker">Tanker</option>
                                <option value="Dump Truck">Dump Truck</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Capacity (kg)</label>
                            <input 
                                type="number" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.capacity_kg}
                                onChange={e => setFormData({...formData, capacity_kg: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Fuel Type</label>
                            <select 
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.fuel_type}
                                onChange={e => setFormData({...formData, fuel_type: e.target.value})}
                            >
                                <option value="Diesel">Diesel</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Current Mileage</label>
                            <input 
                                type="number" 
                                required
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.current_mileage}
                                onChange={e => setFormData({...formData, current_mileage: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</label>
                            <select 
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="Available">Available</option>
                                <option value="In-use">In-use</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Retired">Retired</option>
                            </select>
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
                            {initialData ? 'Save Changes' : 'Add Truck'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const TruckDash = () => {
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTruck, setEditingTruck] = useState(null);

    const fetchTrucks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/trucks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrucks(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching trucks:', err);
            setError('Failed to load trucks');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrucks();
    }, []);

    const handleAdd = () => {
        setEditingTruck(null);
        setIsModalOpen(true);
    };

    const handleEdit = (truck) => {
        setEditingTruck(truck);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this truck?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:4000/api/trucks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchTrucks();
            } catch (err) {
                console.error('Error deleting truck:', err);
                alert('Failed to delete truck');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            if (editingTruck) {
                await axios.put(`http://localhost:4000/api/trucks/${editingTruck._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:4000/api/trucks', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsModalOpen(false);
            fetchTrucks();
        } catch (err) {
            console.error('Error saving truck:', err);
            alert('Failed to save truck');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 w-full max-w-[1600px] mx-auto font-sans">           
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">Fleet Management</h1>
                    <div className="flex items-center gap-2 mt-2 text-neutral-500 text-sm">
                        <Truck size={14} />
                        <span>Manage your vehicle fleet and maintenance</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search fleet..." 
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
                        <span>Add Vehicle</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-900">
                            <Truck size={20} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+2 new</span>
                    </div>
                    <div className="text-3xl font-serif font-bold text-neutral-900">{trucks.length}</div>
                    <div className="text-xs text-neutral-500 mt-1">Total Vehicles</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <span className="text-xs font-bold text-neutral-400">Active</span>
                    </div>
                    <div className="text-3xl font-serif font-bold text-neutral-900">
                        {trucks.filter(t => t.status === 'Available' || t.status === 'In-use').length}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Operational</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                            <Wrench size={20} />
                        </div>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Urgent</span>
                    </div>
                    <div className="text-3xl font-serif font-bold text-neutral-900">
                        {trucks.filter(t => t.status === 'Maintenance').length}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">In Maintenance</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Gauge size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-serif font-bold text-neutral-900">
                        {Math.round(trucks.reduce((acc, t) => acc + t.current_mileage, 0) / (trucks.length || 1)).toLocaleString()}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Avg. Mileage (km)</div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-serif font-bold text-neutral-900">Vehicle Fleet</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold">{trucks.length} Total</span>
                    </div>
                </div>
                
                <div className="p-4">
                    <div className="hidden md:flex items-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-50 mb-2">
                        <div className="w-[20%]">Vehicle Info</div>
                        <div className="w-[12%]">Type/Year</div>
                        <div className="w-[12%]">Fuel</div>
                        <div className="w-[12%]">Mileage</div>
                        <div className="w-[14%]">Tires</div>
                        <div className="w-[15%] text-center">Status</div>
                        <div className="w-[15%] text-right">Actions</div>
                    </div>

                    <div className="space-y-1">
                        {trucks.map((truck) => (
                            <TruckRow 
                                key={truck._id}
                                truck={truck}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                        {trucks.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                                    <Truck size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900">No vehicles found</h3>
                                <p className="text-neutral-500 text-sm mt-1">Get started by adding a new vehicle to your fleet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <TruckModal 
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmit}
                        initialData={editingTruck}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TruckDash;
