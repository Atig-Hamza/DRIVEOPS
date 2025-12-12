import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Search, MapPin, Navigation } from 'lucide-react';
import axios from 'axios';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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

const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13);
        }
    }, [center, map]);
    return null;
};

const LocationMarker = ({ position, setPosition, onLocationSelect }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition({ lat, lng });
            axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                .then(res => {
                    if (res.data && res.data.display_name) {
                        onLocationSelect({
                            address: res.data.display_name,
                            lat,
                            lng
                        });
                    }
                })
                .catch(err => console.error("Reverse geocoding error:", err));
        },
    });

    return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ label, value, onChange, required }) => {
    const [query, setQuery] = useState(value?.address || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [position, setPosition] = useState(value?.lat ? { lat: value.lat, lng: value.lng } : null);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (value?.address) {
            setQuery(value.address);
        }
        if (value?.lat && value?.lng) {
            setPosition({ lat: value.lat, lng: value.lng });
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSearch = async (text) => {
        setQuery(text);
        if (text.length > 2) {
            setLoading(true);
            try {
                const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${text}`);
                setSuggestions(res.data);
            } catch (err) {
                console.error("Geocoding error:", err);
            }
            setLoading(false);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        const lat = parseFloat(suggestion.lat);
        const lng = parseFloat(suggestion.lon);
        const newLocation = {
            address: suggestion.display_name,
            lat,
            lng
        };
        setQuery(suggestion.display_name);
        setPosition({ lat, lng });
        setSuggestions([]);
        onChange(newLocation);
    };

    const handleMapSelect = (location) => {
        setQuery(location.address);
        onChange(location);
    };

    return (
        <div className="space-y-2" ref={wrapperRef}>
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{label}</label>
            <div className="relative">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input 
                            type="text" 
                            required={required}
                            className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                            value={query}
                            onChange={e => handleSearch(e.target.value)}
                            placeholder="Search location..."
                        />
                        {loading && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-900"></div>
                            </div>
                        )}
                    </div>
                    <button 
                        type="button"
                        onClick={() => setShowMap(!showMap)}
                        className={`p-3 border rounded-xl transition-all ${showMap ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
                    >
                        <MapPin size={20} />
                    </button>
                </div>

                {suggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleSelectSuggestion(s)}
                                className="w-full text-left px-4 py-3 hover:bg-neutral-50 text-sm text-neutral-700 border-b border-neutral-50 last:border-0 flex items-start gap-2"
                            >
                                <MapPin size={14} className="mt-1 shrink-0 text-neutral-400" />
                                <span className="truncate">{s.display_name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {showMap && (
                <div className="h-64 w-full rounded-xl overflow-hidden border border-neutral-200 shadow-inner mt-2 relative z-0">
                    <MapContainer 
                        center={position ? [position.lat, position.lng] : [51.505, -0.09]} 
                        zoom={13} 
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapUpdater />
                        <MapController center={position ? [position.lat, position.lng] : null} />
                        <LocationMarker 
                            position={position} 
                            setPosition={setPosition} 
                            onLocationSelect={handleMapSelect} 
                        />
                    </MapContainer>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
