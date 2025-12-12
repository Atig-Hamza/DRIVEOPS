import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import axios from 'axios';
import Sidebar from '../../components/SideBare';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapPin, Truck, User, Calendar } from 'lucide-react';

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

const Tracking = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:4000/api/trips', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTrips(res.data.filter(t => t.start_coordinates && t.end_coordinates));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching trips:", err);
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'blue';
            case 'Completed': return 'green';
            case 'Planned': return 'gray';
            default: return 'red';
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex">
            <Sidebar />
            <div className="flex-1 ml-[280px] relative h-screen flex flex-col">
                <div className="absolute top-6 left-6 z-[1000] bg-white p-4 rounded-2xl shadow-lg border border-neutral-100 max-w-sm">
                    <h1 className="text-2xl font-serif font-bold text-neutral-900 mb-1">Fleet Tracking</h1>
                    <p className="text-sm text-neutral-500 mb-4">Real-time monitoring of active trips</p>
                    
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                        {trips.map(trip => (
                            <div 
                                key={trip._id}
                                onClick={() => setSelectedTrip(trip)}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedTrip?._id === trip._id ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-100 hover:border-neutral-300'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedTrip?._id === trip._id ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                                        {trip.status}
                                    </span>
                                    <span className="text-xs opacity-70">{new Date(trip.start_time).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold mb-1">
                                    <span className="truncate max-w-[100px]">{trip.start_location.split(',')[0]}</span>
                                    <span>→</span>
                                    <span className="truncate max-w-[100px]">{trip.end_location.split(',')[0]}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs opacity-70">
                                    <Truck size={12} />
                                    <span>{trip.truck_id?.License_plate}</span>
                                </div>
                            </div>
                        ))}
                        {trips.length === 0 && !loading && (
                            <div className="text-center py-4 text-neutral-500 text-sm">
                                No active trips with coordinates found.
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 w-full h-full z-0">
                    <MapContainer 
                        center={[34.0, -6.8]}
                        zoom={6} 
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapUpdater />
                        
                        {trips.map(trip => (
                            <React.Fragment key={trip._id}>
                                <Marker position={[trip.start_coordinates.lat, trip.start_coordinates.lng]}>
                                    <Popup>
                                        <div className="font-sans">
                                            <div className="font-bold mb-1">Start: {trip.start_location}</div>
                                            <div className="text-xs text-neutral-500">{new Date(trip.start_time).toLocaleString()}</div>
                                        </div>
                                    </Popup>
                                </Marker>
                                <Marker position={[trip.end_coordinates.lat, trip.end_coordinates.lng]}>
                                    <Popup>
                                        <div className="font-sans">
                                            <div className="font-bold mb-1">End: {trip.end_location}</div>
                                            <div className="text-xs text-neutral-500">{new Date(trip.end_time).toLocaleString()}</div>
                                        </div>
                                    </Popup>
                                </Marker>
                                <Polyline 
                                    positions={[
                                        [trip.start_coordinates.lat, trip.start_coordinates.lng],
                                        [trip.end_coordinates.lat, trip.end_coordinates.lng]
                                    ]}
                                    color={getStatusColor(trip.status)}
                                    weight={4}
                                    opacity={0.7}
                                    dashArray={trip.status === 'Planned' ? '10, 10' : null}
                                />
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Tracking;