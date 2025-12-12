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
    X
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
    const navigate = useNavigate();

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

    const openNavigation = (lat, lng) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
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
                        <button onClick={handleLogout} className="p-2 hover:bg-neutral-50 rounded-full text-neutral-400 hover:text-red-500 transition-colors">
                            <LogOut size={20} />
                        </button>
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
                                            onClick={() => openNavigation(selectedTrip.start_coordinates.lat, selectedTrip.start_coordinates.lng)}
                                            className="flex-1 md:flex-none px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Navigation size={16} />
                                            To Pickup
                                        </button>
                                        <button 
                                            onClick={() => openNavigation(selectedTrip.end_coordinates.lat, selectedTrip.end_coordinates.lng)}
                                            className="flex-1 md:flex-none px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-neutral-900/20 flex items-center justify-center gap-2"
                                        >
                                            <Navigation size={16} />
                                            Start Trip
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
        </div>
    );
};

export default DriverDashboard;