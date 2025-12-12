import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    X,
    Edit2,
    Trash2,
    Mail,
    Calendar,
    Shield
} from 'lucide-react';
import Sidebar from '../../components/SideBare';

const DriverRow = ({ driver, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="group flex items-center px-4 py-3 hover:bg-neutral-50 rounded-xl transition-all duration-200 border border-transparent hover:border-neutral-100">
            <div className="flex items-center gap-4 w-[35%]">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <User size={20} />
                </div>
                <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-neutral-900 font-serif truncate">{driver.email}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1 truncate">
                        <span className="font-mono">ID: {driver._id.slice(-6)}</span>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block w-[25%]">
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-neutral-400" />
                    <div className="text-sm text-neutral-600">Joined {formatDate(driver.createdAt)}</div>
                </div>
            </div>

            <div className="hidden md:block w-[25%]">
                <div className="flex items-center gap-2">
                    <Shield size={14} className="text-neutral-400" />
                    <div className="text-sm text-neutral-600 capitalize">{driver.role}</div>
                </div>
            </div>

            <div className="w-[15%] flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => onEdit(driver)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-all"
                    title="Edit"
                >
                    <Edit2 size={16} />
                </button>
                <button 
                    onClick={() => onDelete(driver._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

const DriverModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                email: initialData.email,
                password: '' // Don't show existing password
            });
        } else {
            setFormData({
                email: '',
                password: ''
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
                className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden"
            >
                <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold text-neutral-900">
                        {initialData ? 'Edit Driver' : 'Add New Driver'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                        <X size={20} className="text-neutral-400" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input 
                                type="email" 
                                required
                                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                placeholder="driver@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                            {initialData ? 'New Password (leave blank to keep current)' : 'Password'}
                        </label>
                        <input 
                            type="password" 
                            required={!initialData}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            placeholder={initialData ? "••••••••" : "Enter password"}
                            minLength={6}
                        />
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
                            {initialData ? 'Save Changes' : 'Create Driver'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDriver, setEditingDriver] = useState(null);

    const fetchDrivers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/users/drivers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDrivers(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching drivers:', err);
            setError('Failed to load drivers');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const handleAdd = () => {
        setEditingDriver(null);
        setIsModalOpen(true);
    };

    const handleEdit = (driver) => {
        setEditingDriver(driver);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this driver?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:4000/api/users/drivers/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchDrivers();
            } catch (err) {
                console.error('Error deleting driver:', err);
                alert('Failed to delete driver');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const dataToSend = { ...formData };
            
            // Remove empty password if editing
            if (editingDriver && !dataToSend.password) {
                delete dataToSend.password;
            }

            if (editingDriver) {
                await axios.put(`http://localhost:4000/api/users/drivers/${editingDriver._id}`, dataToSend, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:4000/api/users/drivers', dataToSend, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsModalOpen(false);
            fetchDrivers();
        } catch (err) {
            console.error('Error saving driver:', err);
            alert(err.response?.data?.message || 'Failed to save driver');
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
                            <h1 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">Driver Management</h1>
                            <div className="flex items-center gap-2 mt-2 text-neutral-500 text-sm">
                                <User size={14} />
                                <span>Manage driver accounts and access</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block group">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search drivers..." 
                                    className="pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent w-72 transition-all shadow-sm"
                                />
                            </div>
                            <button 
                                onClick={handleAdd}
                                className="px-5 py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20 flex items-center gap-2"
                            >
                                <Plus size={18} />
                                <span>Add Driver</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-serif font-bold text-neutral-900">Registered Drivers</h2>
                                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold">{drivers.length} Total</span>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="hidden md:flex items-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-50 mb-2">
                                <div className="w-[35%]">Driver Info</div>
                                <div className="w-[25%]">Joined Date</div>
                                <div className="w-[25%]">Role</div>
                                <div className="w-[15%] text-right">Actions</div>
                            </div>

                            <div className="space-y-1">
                                {drivers.map((driver) => (
                                    <DriverRow 
                                        key={driver._id}
                                        driver={driver}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                                {drivers.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                                            <User size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900">No drivers found</h3>
                                        <p className="text-neutral-500 text-sm mt-1">Add a new driver to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isModalOpen && (
                            <DriverModal 
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onSubmit={handleSubmit}
                                initialData={editingDriver}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Drivers;
