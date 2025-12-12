import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {
    MapPin,
    Calendar,
    Clock,
    Truck,
    Navigation,
    CheckCircle,
    TrendingUp,
    AlertCircle,
    LogOut,
    ChevronRight,
    Menu,
    X,
    Wrench
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
        const timeout = setTimeout(() => {
            map.invalidateSize();
        }, 200);
        return () => clearTimeout(timeout);
    }, [map]);
    return null;
};

const MapController = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
};

const TireModal = ({ isOpen, onClose, truckId }) => {
    const [tiers, setTiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTire, setSelectedTire] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (truckId) {
                setLoading(true);
                fetchTiers();
            } else {
                setLoading(false);
            }
        }
    }, [isOpen, truckId]);

    const fetchTiers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:4000/api/tiers/truck/${truckId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTiers(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching tiers:", err);
            setLoading(false);
        }
    };

    const handleUpdateCondition = async (condition) => {
        if (!selectedTire) return;
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/api/tiers/${selectedTire._id}`, 
                { condition },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTiers();
            setSelectedTire(null);
        } catch (err) {
            console.error("Error updating tier:", err);
        }
    };

    const getTireColor = (condition) => {
        switch (condition) {
            case 'New': return '#3B82F6';
            case 'Good': return '#22C55E';
            case 'Worn': return '#EAB308'; 
            case 'Needs Replacement': return '#EF4444'; 
            default: return '#D1D5DB'; 
        }
    };

    const getTireByPosition = (pos) => tiers.find(t => t.position === pos);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden"
            >
                <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold text-neutral-900">Vehicle Status</h2>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                        <X size={20} className="text-neutral-400" />
                    </button>
                </div>

                <div className="p-8 flex flex-col items-center">
                    {loading ? (
                        <div className="py-10 text-neutral-400">Loading vehicle data...</div>
                    ) : !truckId ? (
                        <div className="py-10 text-center">
                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck size={32} className="text-neutral-400" />
                            </div>
                            <p className="text-neutral-500 font-medium">No truck assigned to current mission.</p>
                        </div>
                    ) : (
                        <div className="relative w-32 h-48">
                            {/* Truck Body */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 h-40 bg-neutral-100 rounded-xl border-2 border-neutral-200"></div>
                            <div className="absolute left-1/2 top-2 -translate-x-1/2 w-12 h-10 bg-neutral-200 rounded-lg border border-neutral-300"></div>

                            {/* Tires */}
                            {['Front Left', 'Front Right', 'Rear Left', 'Rear Right'].map(pos => {
                                const tier = getTireByPosition(pos);
                                const isSelected = selectedTire?._id === tier?._id;
                                
                                let style = {};
                                if (pos === 'Front Left') style = { left: -10, top: 10 };
                                if (pos === 'Front Right') style = { right: -10, top: 10 };
                                if (pos === 'Rear Left') style = { left: -10, bottom: 10 };
                                if (pos === 'Rear Right') style = { right: -10, bottom: 10 };

                                return (
                                    <button
                                        key={pos}
                                        onClick={() => setSelectedTire(tier)}
                                        className={`absolute w-6 h-10 rounded-md border-2 transition-all ${isSelected ? 'ring-2 ring-neutral-900 scale-110' : ''}`}
                                        style={{ 
                                            ...style, 
                                            backgroundColor: getTireColor(tier?.condition),
                                            borderColor: 'rgba(0,0,0,0.1)'
                                        }}
                                    />
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-8 w-full">
                        {selectedTire ? (
                            <div className="space-y-3">
                                <p className="text-center font-bold text-neutral-900 mb-4">
                                    Update {selectedTire.position} Tire
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Good', 'Worn', 'Needs Replacement'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => handleUpdateCondition(status)}
                                            className={`p-3 rounded-xl text-sm font-bold border transition-all ${
                                                selectedTire.condition === status 
                                                    ? 'bg-neutral-900 text-white border-neutral-900' 
                                                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-neutral-400 text-sm">
                                Tap a tire to update its condition
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex items-center gap-3 min-w-[140px]">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{label}</p>
            <h3 className="text-xl font-bold text-neutral-900">{value}</h3>
        </div>
    </div>
);

const TripListItem = ({ trip, isActive, isSelected, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${
                isSelected 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-900/20' 
                    : 'bg-white border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50'
            }`}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-neutral-100'}`}>
                        <Truck size={16} className={isSelected ? 'text-white' : 'text-neutral-600'} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isActive 
                            ? (isSelected ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600')
                            : (isSelected ? 'bg-white/10 text-neutral-400' : 'bg-neutral-100 text-neutral-500')
                    }`}>
                        {isActive ? 'Active Mission' : 'Upcoming'}
                    </span>
                </div>
                <ChevronRight size={16} className={`transition-transform ${isSelected ? 'text-white rotate-90' : 'text-neutral-400 group-hover:translate-x-1'}`} />
            </div>

            <div className="space-y-3 relative z-10">
                <div className="flex items-start gap-3">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-neutral-500' : 'bg-neutral-300'}`}></div>
                    <div>
                        <p className={`text-xs font-medium mb-0.5 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>Pickup</p>
                        <p className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-900'}`}>{trip.start_location}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-neutral-900'}`}></div>
                    <div>
                        <p className={`text-xs font-medium mb-0.5 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>Dropoff</p>
                        <p className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-900'}`}>{trip.end_location}</p>
                    </div>
                </div>
            </div>
        </button>
    );
};

const DriverDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [showMobileMap, setShowMobileMap] = useState(false);
    const [isTireModalOpen, setIsTireModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCompleteTrip = async () => {
        if (!selectedTrip) return;
        if (window.confirm('Are you sure you want to mark this trip as completed?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:4000/api/trips/${selectedTrip._id}`, 
                    { status: 'Completed' },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                
                const res = await axios.get('http://localhost:4000/api/dashboard/driver-stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
                setSelectedTrip(null);
            } catch (err) {
                console.error(err);
                alert('Failed to complete trip');
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:4000/api/dashboard/driver-stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
                // Select current trip by default, or first upcoming
                if (res.data.currentTrip) {
                    setSelectedTrip(res.data.currentTrip);
                } else if (res.data.upcomingTrips && res.data.upcomingTrips.length > 0) {
                    setSelectedTrip(res.data.upcomingTrips[0]);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const openNavigation = (startLat, startLng, endLat, endLng) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${endLat},${endLng}&waypoints=${startLat},${startLng}`, '_blank');
    };

    const getTripBounds = (trip) => {
        if (!trip?.start_coordinates || !trip?.end_coordinates) return null;
        return [
            [trip.start_coordinates.lat, trip.start_coordinates.lng],
            [trip.end_coordinates.lat, trip.end_coordinates.lng]
        ];
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white">Loading...</div>;

    return (
        <div className="flex h-screen bg-white overflow-hidden font-sans">
            
            <div className={`w-full md:w-[450px] flex flex-col h-full border-r border-neutral-200 z-20 bg-white shadow-2xl transition-transform duration-300 absolute md:relative ${showMobileMap ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
                
                <div className="p-6 border-b border-neutral-100 bg-white sticky top-0 z-10">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-white font-serif font-bold">
                                D
                            </div>
                            <div>
                                <h1 className="font-serif font-bold text-neutral-900 leading-none">DriveOps</h1>
                                <span className="text-xs text-neutral-500">Driver Portal</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setIsTireModalOpen(true)}
                                className="p-2 hover:bg-neutral-50 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors"
                                title="Vehicle Status"
                            >
                                <Wrench size={20} />
                            </button>
                            <button onClick={handleLogout} className="p-2 hover:bg-neutral-50 rounded-full text-neutral-400 hover:text-red-500 transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>

                    
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <StatCard 
                            label="Completed" 
                            value={data?.stats?.completed || 0} 
                            icon={CheckCircle}
                            color="bg-green-50 text-green-600"
                        />
                        <StatCard 
                            label="Efficiency" 
                            value={`${data?.stats?.efficiency || 0}%`} 
                            icon={TrendingUp}
                            color="bg-blue-50 text-blue-600"
                        />
                    </div>
                </div>

                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {data?.currentTrip && (
                        <div className="space-y-3">
                            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                Active Mission
                            </h2>
                            <TripListItem 
                                trip={data.currentTrip} 
                                isActive={true} 
                                isSelected={selectedTrip?._id === data.currentTrip._id}
                                onClick={() => {
                                    setSelectedTrip(data.currentTrip);
                                    setShowMobileMap(true);
                                }}
                            />
                        </div>
                    )}

                    <div className="space-y-3">
                        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Upcoming Schedule</h2>
                        {data?.upcomingTrips?.length > 0 ? (
                            data.upcomingTrips.map(trip => (
                                <TripListItem 
                                    key={trip._id} 
                                    trip={trip} 
                                    isActive={false}
                                    isSelected={selectedTrip?._id === trip._id}
                                    onClick={() => {
                                        setSelectedTrip(trip);
                                        setShowMobileMap(true);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-neutral-400 text-sm bg-neutral-50 rounded-2xl border border-neutral-100 border-dashed">
                                No upcoming trips
                            </div>
                        )}
                    </div>
                </div>
            </div>

            
            <div className={`flex-1 relative bg-neutral-100 h-full transition-transform duration-300 absolute md:relative w-full md:w-auto ${showMobileMap ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
                
                <button 
                    onClick={() => setShowMobileMap(false)}
                    className="md:hidden absolute top-4 left-4 z-[1000] p-3 bg-white rounded-full shadow-lg text-neutral-900"
                >
                    <X size={24} />
                </button>

                {selectedTrip && selectedTrip.start_coordinates && selectedTrip.end_coordinates ? (
                    <>
                        <MapContainer 
                            center={[selectedTrip.start_coordinates.lat, selectedTrip.start_coordinates.lng]} 
                            zoom={13} 
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            />
                            <MapUpdater />
                            <MapController bounds={getTripBounds(selectedTrip)} />
                            
                            <Marker position={[selectedTrip.start_coordinates.lat, selectedTrip.start_coordinates.lng]}>
                                <Popup className="font-sans">
                                    <div className="font-bold">Pickup Location</div>
                                    <div className="text-xs text-neutral-500">{selectedTrip.start_location}</div>
                                </Popup>
                            </Marker>
                            <Marker position={[selectedTrip.end_coordinates.lat, selectedTrip.end_coordinates.lng]}>
                                <Popup className="font-sans">
                                    <div className="font-bold">Dropoff Location</div>
                                    <div className="text-xs text-neutral-500">{selectedTrip.end_location}</div>
                                </Popup>
                            </Marker>
                            <Polyline 
                                positions={[
                                    [selectedTrip.start_coordinates.lat, selectedTrip.start_coordinates.lng],
                                    [selectedTrip.end_coordinates.lat, selectedTrip.end_coordinates.lng]
                                ]}
                                color="#171717"
                                weight={4}
                                opacity={0.8}
                                dashArray="10, 10"
                            />
                        </MapContainer>

                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/50 to-transparent pointer-events-none flex justify-center z-[1000]">
                            <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-2xl pointer-events-auto border border-neutral-100">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider">
                                                {selectedTrip.status}
                                            </span>
                                            <span className="text-xs text-neutral-500 font-medium">
                                                {new Date(selectedTrip.start_time).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-serif font-bold text-neutral-900">
                                            {selectedTrip.truck_id ? `${selectedTrip.truck_id.brand} ${selectedTrip.truck_id.model}` : 'No Truck'}
                                        </h2>
                                        <p className="text-sm text-neutral-500 truncate max-w-xs">
                                            {selectedTrip.start_location} → {selectedTrip.end_location}
                                        </p>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => openNavigation(
                                                selectedTrip.start_coordinates.lat, 
                                                selectedTrip.start_coordinates.lng,
                                                selectedTrip.end_coordinates.lat, 
                                                selectedTrip.end_coordinates.lng
                                            )}
                                            className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                                            title="Navigate Route (Pickup -> Dropoff)"
                                        >
                                            <Navigation size={16} />
                                        </button>
                                        <button 
                                            onClick={handleCompleteTrip}
                                            className="flex-1 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-neutral-900/20 flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle size={16} />
                                            Complete Trip
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-400 bg-neutral-50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <MapPin size={32} />
                        </div>
                        <p className="font-medium">Select a trip to view route</p>
                    </div>
                )}
            </div>

            <TireModal 
                isOpen={isTireModalOpen} 
                onClose={() => setIsTireModalOpen(false)} 
                truckId={selectedTrip?.truck_id?._id || data?.currentTrip?.truck_id?._id}
            />
        </div>
    );
};

export default DriverDashboard;