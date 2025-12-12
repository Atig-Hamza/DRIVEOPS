import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Truck, MapPin, Home, ArrowLeft, NavigationOff } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ 
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                }}
            />

            <div className="relative z-10 max-w-lg w-full text-center">
                {/* Animated Scene */}
                <div className="h-48 relative mb-8 flex items-center justify-center">
                    {/* Road */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-200"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 w-full animate-pulse opacity-20"></div>

                    {/* 404 Sign */}
                    <motion.div 
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                        className="absolute bottom-0 right-1/4 translate-x-1/2 flex flex-col items-center origin-bottom"
                    >
                        <div className="bg-neutral-900 text-white px-4 py-2 rounded-lg font-bold text-xl border-2 border-neutral-800 shadow-xl">
                            404
                        </div>
                        <div className="h-16 w-1 bg-neutral-400"></div>
                    </motion.div>

                    {/* Truck Animation */}
                    <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                        className="absolute bottom-0.5 left-1/4 -translate-x-1/2"
                    >
                        <div className="relative">
                            <Truck size={64} className="text-neutral-900" strokeWidth={1.5} />
                            <motion.div 
                                animate={{ y: [-2, 0, -2] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-4 -right-2"
                            >
                                <div className="bg-neutral-100 p-1.5 rounded-full border border-neutral-200 shadow-sm">
                                    <NavigationOff size={16} className="text-red-500" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900">
                        Off the Map
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-md mx-auto leading-relaxed">
                        Looks like this route doesn't exist. The destination you're looking for might have been moved or deleted.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <button 
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-white border border-neutral-200 text-neutral-600 rounded-xl font-bold hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/20 flex items-center justify-center gap-2"
                        >
                            <Home size={18} />
                            Return Home
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Footer Decoration */}
            <div className="absolute bottom-6 text-neutral-300 text-xs font-mono">
                ERR_ROUTE_NOT_FOUND :: SYSTEM_HALT
            </div>
        </div>
    );
};

export default NotFound;
