import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutGrid,
    LineChart,
    ChevronDown,
    Truck,
    Users,
    LogOut,
    Settings
} from 'lucide-react';

const SideBare = () => {
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
    const [activeItem, setActiveItem] = useState('Dashboard');
    const navigate = useNavigate();

    const menuItems = [
        { id: 'Dashboard', icon: LayoutGrid, label: 'Dashboard' },
        { id: 'Tracking', icon: LineChart, label: 'Tracking' },
    ];

    const managementItems = [
        { id: 'Overview', label: 'Overview' },
        { id: 'Applications', label: 'Applications' },
        { id: 'Assignment', label: 'Assignment' },
        { id: 'Trucks', label: 'Trucks' },
        { id: 'Trip', label: 'Trip' },
    ];

    const handleNavigation = (id) => {
        setActiveItem(id);
        navigate(`/admin/${id.toLowerCase()}`);
    };

    return (
        <div className="fixed top-0 left-0 h-screen bg-white border-r border-neutral-200 w-[280px] flex flex-col font-sans z-50">
            <div className="p-8 pb-6">
                <div className="flex items-center gap-2">
                    <div className="text-2xl font-serif font-bold tracking-tighter text-neutral-900 flex items-center gap-1">
                        DriveOps
                        <div className="w-2 h-2 rounded-full bg-neutral-900 mt-2"></div>
                    </div>
                </div>
            </div>

            <div className="px-6 mb-6">
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-3 group cursor-pointer hover:border-neutral-200 transition-colors">
                    <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-white font-serif font-bold text-lg shadow-md shadow-neutral-900/20">
                        A
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <h3 className="font-bold text-neutral-900 text-sm truncate">Admin Panel</h3>
                        <span className="text-xs text-neutral-500 truncate">admin@driveops.com</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-hide">
                <div className="px-2 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Main Menu
                </div>

                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeItem === item.id
                                ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20'
                                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                    >
                        <item.icon size={20} className={activeItem === item.id ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-900'} />
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                ))}

                <div className="pt-2">
                    <button
                        onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${['Overview', 'Applications', 'Assignment', 'Trucks', 'Trip'].includes(activeItem)
                                ? 'bg-neutral-50 text-neutral-900'
                                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Truck size={20} className={['Overview', 'Applications', 'Assignment', 'Trucks', 'Trip'].includes(activeItem) ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-900'} />
                            <span className="text-sm font-medium">Management</span>
                        </div>
                        <motion.div
                            animate={{ rotate: isPortfolioOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={16} />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {isPortfolioOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="ml-4 pl-4 border-l border-neutral-200 my-1 space-y-1">
                                    {managementItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigation(item.id)}
                                            className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors ${activeItem === item.id
                                                    ? 'text-neutral-900 font-semibold bg-neutral-100'
                                                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => handleNavigation('Drivers')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${activeItem === 'Drivers'
                            ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20'
                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <Users size={20} className={activeItem === 'Drivers' ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-900'} />
                        <span className="text-sm font-medium">Drivers</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeItem === 'Drivers'
                            ? 'bg-white text-neutral-900'
                            : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
                        }`}>2</span>
                </button>
            </div>

            <div className="p-4 border-t border-neutral-100 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group">
                    <Settings size={20} className="text-neutral-400 group-hover:text-neutral-900" />
                    <span className="text-sm font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors group">
                    <LogOut size={20} className="text-red-500 group-hover:text-red-600" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SideBare;