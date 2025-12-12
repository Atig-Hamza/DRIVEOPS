import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Package,
    AlertCircle,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    MapPin,
    Search,
    Bell,
    Truck,
    Calendar,
    FileText
} from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, isDark = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border transition-all duration-300 group ${
            isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white shadow-xl shadow-neutral-900/20' 
                : 'bg-white border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-900/5'
        }`}
    >
        <div className="flex justify-between items-start mb-8">
            <div className={`p-3 rounded-xl transition-colors ${
                isDark ? 'bg-white/10 text-white' : 'bg-neutral-50 text-neutral-900 group-hover:bg-neutral-100'
            }`}>
                <Icon size={24} />
            </div>
            {/* <div className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full ${
                trend === 'up' 
                    ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600')
                    : (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600')
            }`}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div> */}
        </div>
        <div>
            <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{title}</h3>
            <h2 className="text-3xl font-serif font-bold tracking-tight">{value}</h2>
        </div>
    </motion.div>
);

const RecentShipmentRow = ({ id, destination, status, driver, time }) => (
    <div className="group flex items-center justify-between p-4 hover:bg-neutral-50 rounded-xl transition-all duration-200 border border-transparent hover:border-neutral-100">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                <Package size={20} className="text-neutral-900" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-neutral-900 font-serif">{id}</h4>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                    <MapPin size={12} />
                    {destination}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-neutral-900">{driver}</p>
                <p className="text-xs text-neutral-500 mt-0.5">Driver</p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                status === 'Completed' ? 'bg-neutral-900 text-white border-neutral-900' :
                status === 'Planned' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                'bg-orange-50 text-orange-700 border-orange-100'
            }`}>
                {status}
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-neutral-400 hover:text-neutral-900">
                <MoreHorizontal size={18} />
            </button>
        </div>
    </div>
);

const AdminDash = () => {
    const [stats, setStats] = useState({
        pendingApplications: 0,
        activeTrips: 0,
        totalDrivers: 0,
        maintenanceTrucks: 0,
        recentTrips: [],
        fleetStatus: {
            available: 0,
            inUse: 0,
            maintenance: 0,
            retired: 0
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/dashboard/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 w-full max-w-[1600px] mx-auto font-sans">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">Dashboard Overview</h1>
                    <div className="flex items-center gap-2 mt-2 text-neutral-500 text-sm">
                        <Calendar size={14} />
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search shipments, drivers..." 
                            className="pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent w-72 transition-all shadow-sm"
                        />
                    </div>
                    <button className="p-3 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all relative shadow-sm">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard 
                    title="Pending Applications" 
                    value={stats.pendingApplications} 
                    change="" 
                    trend="up" 
                    icon={FileText} 
                    isDark={true}
                />
                <StatCard 
                    title="Active Trips" 
                    value={stats.activeTrips} 
                    change="" 
                    trend="up" 
                    icon={Package} 
                />
                <StatCard 
                    title="Active Drivers" 
                    value={stats.totalDrivers} 
                    change="" 
                    trend="up" 
                    icon={Users} 
                />
                <StatCard 
                    title="Maintenance Trucks" 
                    value={stats.maintenanceTrucks} 
                    change="" 
                    trend="down" 
                    icon={AlertCircle} 
                />
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-white">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-neutral-900">Recent Trips</h2>
                            <p className="text-sm text-neutral-500 mt-1">Track and manage your latest deliveries</p>
                        </div>
                        <button className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 text-sm font-medium rounded-lg transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="p-4 flex-1">
                        {stats.recentTrips.map((trip) => (
                            <RecentShipmentRow 
                                key={trip._id}
                                id={`#TRP-${trip._id.slice(-4)}`}
                                destination={trip.end_location}
                                status={trip.status}
                                driver={trip.driver_id?.email || 'Unassigned'}
                                time={new Date(trip.createdAt).toLocaleDateString()}
                            />
                        ))}
                        {stats.recentTrips.length === 0 && (
                            <div className="text-center py-8 text-neutral-500">No recent trips</div>
                        )}
                    </div>
                </div>

                <div className="space-y-8"> 
                    <div className="bg-neutral-900 text-white rounded-3xl p-8 shadow-2xl shadow-neutral-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="font-serif font-bold text-xl mb-1">Fleet Status</h3>
                                    <p className="text-neutral-400 text-sm">Real-time vehicle availability</p>
                                </div>
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Truck size={20} className="text-white" />
                                </div>
                            </div>    
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse"></div>
                                            <span className="text-sm font-medium text-neutral-200">Available</span>
                                        </div>
                                        <span className="font-bold font-serif text-lg">{stats.fleetStatus.available}</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-green-400 h-full rounded-full" style={{ width: `${(stats.fleetStatus.available / (Object.values(stats.fleetStatus).reduce((a, b) => a + b, 0) || 1)) * 100}%` }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span className="text-sm font-medium text-neutral-200">In Use</span>
                                        </div>
                                        <span className="font-bold font-serif text-lg">{stats.fleetStatus.inUse}</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-400 h-full rounded-full" style={{ width: `${(stats.fleetStatus.inUse / (Object.values(stats.fleetStatus).reduce((a, b) => a + b, 0) || 1)) * 100}%` }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                            <span className="text-sm font-medium text-neutral-200">Maintenance</span>
                                        </div>
                                        <span className="font-bold font-serif text-lg">{stats.fleetStatus.maintenance}</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-orange-400 h-full rounded-full" style={{ width: `${(stats.fleetStatus.maintenance / (Object.values(stats.fleetStatus).reduce((a, b) => a + b, 0) || 1)) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif font-bold text-lg text-neutral-900">Activity Feed</h3>
                            <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <div className="space-y-8">
                            {[
                                { title: 'New shipment created', time: '2 min ago', user: 'Admin' },
                                { title: 'Driver assigned to #TRK-2492', time: '15 min ago', user: 'System' },
                                { title: 'Delivery completed #TRK-2488', time: '1 hour ago', user: 'Mike Ross' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {i !== 2 && <div className="absolute left-[5px] top-3 bottom-[-25px] w-[2px] bg-neutral-100"></div>}
                                    <div className="flex flex-col items-center">
                                        <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full ring-4 ring-white"></div>
                                    </div>
                                    <div className="pb-1">
                                        <p className="text-sm text-neutral-900 font-bold">{item.title}</p>
                                        <p className="text-xs text-neutral-500 mt-1">{item.time} • {item.user}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDash;
