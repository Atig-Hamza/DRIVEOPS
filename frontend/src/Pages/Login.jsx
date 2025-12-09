import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
    ArrowRight, Mail, Lock, Eye, EyeOff, Check,
    Navigation, Truck, MapPin, Clock, Package, CheckCircle2
} from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const truckControls = useAnimation();
    const [journeyStep, setJourneyStep] = useState(0); 

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                setJourneyStep(0);
                await truckControls.start({ offsetDistance: "0%", transition: { duration: 0 } });
                setJourneyStep(1);
                await truckControls.start({
                    offsetDistance: "100%",
                    transition: { duration: 12, ease: "linear" }
                });
                setJourneyStep(2);
                await new Promise(r => setTimeout(r, 2000)); 
            }
        };
        sequence();
    }, [truckControls]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen w-full bg-white flex overflow-hidden font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
            <div className="w-full lg:w-[45%] relative flex flex-col justify-center px-6 md:px-20 xl:px-32 z-20 bg-white border-r border-neutral-100">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="absolute top-8 left-6 md:left-12">
                    <a href="/" className="text-2xl font-serif font-bold tracking-tighter text-neutral-900 flex items-center gap-2">
                        <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white">
                            <Truck size={16} strokeWidth={2.5} />
                        </div>
                        DriveOps
                    </a>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="w-full max-w-md mx-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-neutral-900">Track Shipment</h1>
                        <p className="text-neutral-500 text-lg font-light">Real-time logistics management console.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors"><Mail className="w-5 h-5" /></div>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-4 outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-all placeholder:text-neutral-400" required />
                            </div>
                            <div className="group relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors"><Lock className="w-5 h-5" /></div>
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-4 outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-all placeholder:text-neutral-400" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-neutral-300 group-hover:border-neutral-400'}`} onClick={() => setRememberMe(!rememberMe)}>{rememberMe && <Check className="w-3 h-3 text-white" />}</div>
                                <span className="text-sm text-neutral-600 select-none">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">Forgot password?</a>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full bg-neutral-900 text-white rounded-xl py-4 font-medium text-lg hover:bg-neutral-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden shadow-xl shadow-neutral-900/20">
                            <span className={`flex items-center gap-2 transition-transform duration-300 ${isLoading ? '-translate-y-10' : 'translate-y-0'}`}>Sign In <ArrowRight className="w-4 h-4" /></span>
                            {isLoading && (<div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></div>)}
                        </button>
                    </form>
                    <div className="mt-8 text-center"><span className="text-neutral-500 text-sm">Don't have an account? </span><a href="#" className="text-neutral-900 font-medium text-sm hover:underline">Start free trial</a></div>
                </motion.div>
            </div>
            <div className="hidden lg:block w-[55%] relative bg-[#F1F5F9] overflow-hidden">
                <div className="absolute inset-0 z-0">

                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
                        backgroundSize: '40px 40px'
                    }}></div>


                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white rounded-full opacity-60 blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full opacity-60 blur-3xl"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#94A3B8" floodOpacity="0.3" />
                            </filter>
                            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="100%" stopColor="#F8FAFC" />
                            </linearGradient>
                        </defs>
                        <path d="M -50 600 Q 200 550 400 650 T 850 600" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                        <path d="M 200 -50 Q 250 200 150 400" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                        <path
                            id="mainRoute"
                            d="M 50 150 C 150 150, 200 300, 350 350 S 650 400, 750 650"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="30"
                            strokeLinecap="round"
                            filter="url(#shadow)"
                        />
                        <motion.path
                            d="M 50 150 C 150 150, 200 300, 350 350 S 650 400, 750 650"
                            fill="none"
                            stroke="#0F172A"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="0 1"
                            animate={{ pathLength: journeyStep === 1 ? 1 : 0 }}
                            transition={{ duration: 12, ease: "linear" }}
                        />
                        <circle cx="50" cy="150" r="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />
                        <circle cx="50" cy="150" r="4" fill="#0F172A" />
                        <circle cx="750" cy="650" r="16" fill="#0F172A" stroke="#FFFFFF" strokeWidth="4" filter="url(#shadow)" />
                        <Check cx="750" cy="650" size={12} stroke="white" strokeWidth={4} />
                    </svg>

                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-0 left-0"
                            style={{
                                offsetPath: `path("M 50 150 C 150 150, 200 300, 350 350 S 650 400, 750 650")`,
                                offsetRotate: "auto 0deg",
                            }}
                            animate={truckControls}
                        >
                            <div className="relative -ml-6 -mt-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: journeyStep === 1 ? 1 : 0, y: journeyStep === 1 ? -60 : 10 }}
                                    className="absolute left-1/2 -translate-x-1/2 -top-4 w-28 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg border border-white/50 text-center"
                                >
                                    <div className="text-[10px] font-bold text-neutral-400 uppercase">Speed</div>
                                    <div className="text-sm font-bold text-neutral-900">85 km/h</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-10 right-10 flex flex-col items-end">
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-neutral-700 uppercase tracking-wide">System Online</span>
                    </div>

                    <div className="text-right">
                        <div className="text-5xl font-serif font-medium text-neutral-900 tracking-tight">842</div>
                        <div className="text-sm font-medium text-neutral-500 uppercase tracking-widest mt-1">Active Shipments</div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-10">
                    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 w-64">
                        <div className="flex items-center gap-2 mb-4 border-b border-neutral-100 pb-3">
                            <Package size={16} className="text-neutral-900" />
                            <span className="font-bold text-sm text-neutral-900">Order #SHP-2901</span>
                        </div>

                        <div className="space-y-4 relative">

                            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neutral-100"></div>


                            <div className="relative flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 bg-white z-10 flex items-center justify-center ${journeyStep >= 0 ? 'border-neutral-900' : 'border-neutral-300'}`}>
                                    {journeyStep >= 0 && <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>}
                                </div>
                                <span className={`text-xs font-medium ${journeyStep >= 0 ? 'text-neutral-900' : 'text-neutral-400'}`}>Dispatch Warehouse</span>
                            </div>

                            <div className="relative flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 bg-white z-10 flex items-center justify-center ${journeyStep >= 1 ? 'border-neutral-900' : 'border-neutral-300'}`}>
                                    {journeyStep === 1 && <div className="w-2 h-2 bg-neutral-900 rounded-full animate-pulse"></div>}
                                </div>
                                <span className={`text-xs font-medium ${journeyStep === 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>In Transit</span>
                            </div>

                            <div className="relative flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 bg-white z-10 flex items-center justify-center ${journeyStep >= 2 ? 'border-neutral-900' : 'border-neutral-300'}`}>
                                    {journeyStep === 2 && <Check size={10} className="text-neutral-900" />}
                                </div>
                                <span className={`text-xs font-medium ${journeyStep >= 2 ? 'text-neutral-900' : 'text-neutral-400'}`}>Delivered</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 right-10">
                    <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-full border border-white flex items-center justify-center">
                        <Navigation className="text-neutral-400 transform -rotate-45" size={24} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;