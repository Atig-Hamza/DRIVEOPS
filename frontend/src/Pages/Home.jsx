import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Check, ChevronRight,
  BarChart2, Map, Shield, Truck, Users, Globe,
  ArrowUpRight, Play, Battery, Zap, MessageSquare, FileText, Bell
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg py-4 border-b border-neutral-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-semibold tracking-tight text-neutral-900">
          DriveOps<span className="text-neutral-400">.</span>
        </a>

        <div className="hidden md:flex items-center gap-12">
          <a href="#product" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Product</a>
          <a href="#solutions" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Solutions</a>
          <a href="#pricing" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">Log in</button>
          <button className="bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl md:text-8xl font-serif font-medium text-neutral-900 leading-[0.95] tracking-tight mb-8">
                Master <br />
                <span className="text-neutral-400 italic">the</span> Motion.
              </h1>
              <p className="text-xl text-neutral-600 max-w-md leading-relaxed mb-12 font-light">
                The operating system for modern logistics.
                Orchestrate your entire fleet from a single, beautiful command center.
              </p>

              <div className="flex items-center gap-6">
                <button className="group flex items-center gap-3 bg-neutral-900 text-white pl-8 pr-6 py-4 rounded-full text-lg transition-all hover:bg-neutral-800">
                  Start Trial
                  <span className="w-8 h-8 bg-white text-neutral-900 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <button className="flex items-center gap-3 text-neutral-900 font-medium px-6 py-4 rounded-full border border-neutral-200 hover:bg-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                  Showreel
                </button>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[800px] hidden lg:block">
            <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[85%] z-10">
              <div className="aspect-[4/5] bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-100 p-2">
                <div className="w-full h-full bg-[#F5F5F5] rounded-xl relative overflow-hidden">
                  {/* Realistic Map Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                  <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M20,100 C20,80 50,80 50,50 C50,20 80,20 80,0" fill="none" stroke="black" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d="M10,0 C10,30 40,30 40,60 C40,90 70,90 70,100" fill="none" stroke="black" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>

                  {/* Animated Route Path */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                      d="M 120 100 Q 150 200 250 250 T 400 350"
                      fill="none"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="400" cy="350" r="6" fill="#000"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 3 }}
                    />
                    {/* Pulsing Current Location */}
                    <motion.g
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="0" cy="0" r="8" fill="#000" fillOpacity="0.2">
                        <animateMotion path="M 120 100 Q 150 200 250 250 T 400 350" dur="10s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="0" cy="0" r="4" fill="#000">
                        <animateMotion path="M 120 100 Q 150 200 250 250 T 400 350" dur="10s" repeatCount="indefinite" />
                      </circle>
                    </motion.g>
                  </svg>

                  {/* Detailed Tracking Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-24 left-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 w-72"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center border border-white shadow-sm">
                          <Users className="w-5 h-5 text-neutral-700" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-neutral-900">Michael R.</div>
                          <div className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Driver • ID #892</div>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div>
                        ON TIME
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative pl-4 border-l-2 border-neutral-100 space-y-4">
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-neutral-900 bg-white"></div>
                          <div className="text-xs text-neutral-400 mb-0.5">Current Location</div>
                          <div className="text-sm font-medium text-neutral-900">San Francisco, CA</div>
                          <div className="text-xs text-neutral-400 mt-0.5">Departed 8:30 AM</div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-neutral-200 bg-white"></div>
                          <div className="text-xs text-neutral-400 mb-0.5">Destination</div>
                          <div className="text-sm font-medium text-neutral-900">Los Angeles, CA</div>
                          <div className="text-xs text-neutral-500 mt-0.5 font-mono bg-neutral-100 inline-block px-1.5 py-0.5 rounded">ETA 14:45</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-neutral-100 flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Speed</div>
                        <div className="text-sm font-bold text-neutral-900">65 mph</div>
                      </div>
                      <div className="w-px h-6 bg-neutral-100"></div>
                      <div className="text-center">
                        <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Fuel</div>
                        <div className="text-sm font-bold text-neutral-900">84%</div>
                      </div>
                      <div className="w-px h-6 bg-neutral-100"></div>
                      <div className="text-center">
                        <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Temp</div>
                        <div className="text-sm font-bold text-neutral-900">34°F</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Secondary Floating Widget */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-32 right-8 bg-neutral-900 text-white p-4 rounded-xl shadow-2xl w-48 z-20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs font-medium text-white/80">System Alert</div>
                    </div>
                    <div className="text-sm font-medium mb-1">Maintenance Due</div>
                    <div className="text-xs text-white/60 mb-3">Vehicle #402 brake check</div>
                    <button className="w-full bg-white text-neutral-900 text-xs font-bold py-2 rounded-lg hover:bg-neutral-200 transition-colors">
                      Schedule Now
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="absolute bottom-20 left-0 w-[50%] z-0">
              <div className="aspect-square bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center">
                      <BarChart2 className="w-6 h-6 text-neutral-900" />
                    </div>
                    <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                  </div>
                  <div className="text-4xl font-serif font-medium text-neutral-900 mb-2">98.2%</div>
                  <div className="text-sm text-neutral-500">Fleet Efficiency Rating</div>
                </div>
                <div className="h-32 flex items-end gap-2">
                  {[40, 65, 50, 80, 60, 90, 85].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                      className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-neutral-900' : 'bg-neutral-100'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyFeature = ({ number, title, description, children }) => {
  return (
    <div className="min-h-screen flex items-center py-20 border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-20">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-mono text-neutral-400 mb-8 block">0{number}</span>
          <h2 className="text-5xl md:text-6xl font-serif text-neutral-900 mb-8 leading-tight">{title}</h2>
          <p className="text-xl text-neutral-500 leading-relaxed max-w-md">{description}</p>
          <div className="mt-12">
            <button className="text-neutral-900 font-medium border-b border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-all">
              Explore Feature
            </button>
          </div>
        </div>
        <div className="relative aspect-square lg:aspect-[4/3] bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
          {children}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-white">
      {/* Feature 1: Real-Time Visibility */}
      <StickyFeature
        number="1"
        title="Real-Time Visibility"
        description="See your entire operation at a glance. Live GPS tracking, status updates, and predictive ETAs for every asset in your fleet."
      >
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
          <div className="w-[85%] bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-white">
              <div className="font-medium text-neutral-900">Fleet Command</div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="divide-y divide-neutral-50">
              {[
                { id: "V-402", status: "Moving", loc: "I-80 West", speed: "65mph" },
                { id: "V-405", status: "Idle", loc: "Loading Dock", speed: "0mph" },
                { id: "V-409", status: "Moving", loc: "Hwy 101", speed: "58mph" },
                { id: "V-412", status: "Stopped", loc: "Rest Area", speed: "0mph" },
              ].map((vehicle, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${vehicle.status === 'Moving' ? 'bg-green-500 animate-pulse' : vehicle.status === 'Idle' ? 'bg-yellow-500' : 'bg-neutral-300'}`}></div>
                    <div>
                      <div className="text-sm font-bold text-neutral-900">{vehicle.id}</div>
                      <div className="text-xs text-neutral-500">{vehicle.loc}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-neutral-400">{vehicle.speed}</div>
                    <div className="text-[10px] font-medium text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded mt-1 inline-block">{vehicle.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-neutral-50 text-center text-xs text-neutral-400 font-medium border-t border-neutral-100">
              Viewing 4 of 142 Active Vehicles
            </div>
          </div>
        </div>
      </StickyFeature>

      {/* Feature 2: Predictive Maintenance */}
      <StickyFeature
        number="2"
        title="Predictive Maintenance"
        description="Stop reacting to breakdowns. Our AI analyzes mileage and usage patterns to schedule service before issues occur."
      >
        <div className="absolute inset-0 bg-neutral-900 p-8 text-white flex flex-col">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Vehicle Health</div>
                <div className="text-xs text-neutral-400">Unit #892 Diagnostics</div>
              </div>
            </div>
            <div className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">
              ACTION REQUIRED
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-neutral-400 mb-2">Tire Pressure</div>
              <div className="grid grid-cols-2 gap-2">
                {[32, 31, 32, 28].map((psi, i) => (
                  <div key={i} className={`text-center p-2 rounded ${psi < 30 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/5 text-white'}`}>
                    <div className="text-lg font-bold">{psi}</div>
                    <div className="text-[10px] opacity-60">PSI</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="text-xs text-neutral-400">Engine Temp</div>
              <div className="flex items-end gap-1 h-20">
                {[40, 45, 42, 50, 55, 60, 85, 90, 88, 85].map((h, i) => (
                  <div key={i} className={`w-full rounded-t-sm ${h > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="text-right text-xl font-bold text-red-400">210°F</div>
            </div>
          </div>

          <button className="w-full bg-white text-neutral-900 font-bold py-4 rounded-xl hover:bg-neutral-200 transition-colors mt-auto flex items-center justify-center gap-2">
            Schedule Service
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </StickyFeature>

      {/* Feature 3: Driver Workflow */}
      <StickyFeature
        number="3"
        title="Driver Workflow"
        description="Empower your team with a mobile experience they'll actually enjoy. Digital logs, instant document scanning, and seamless communication."
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F7]">
          <div className="w-[300px] h-[600px] bg-white rounded-[40px] border-[8px] border-neutral-900 shadow-2xl overflow-hidden relative flex flex-col">
            {/* Mobile Header */}
            <div className="bg-neutral-900 text-white p-6 pt-12 pb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </div>
                <div className="font-medium">Dispatch Chat</div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-neutral-50 p-4 space-y-4 overflow-y-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0"></div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-neutral-600 max-w-[80%]">
                  Hi Michael, new load assigned. Pickup at Distribution Center A.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0"></div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-neutral-600 max-w-[80%]">
                  <div className="font-bold text-neutral-900 mb-1">Load #4921</div>
                  <div className="text-xs text-neutral-500 mb-2">24 Pallets • Electronics</div>
                  <button className="bg-neutral-900 text-white text-xs px-3 py-2 rounded-lg w-full">View Details</button>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-neutral-900 flex-shrink-0"></div>
                <div className="bg-neutral-900 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[80%]">
                  Accepted. I'm 10 mins away.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0"></div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-neutral-600 max-w-[80%]">
                  Great. Don't forget to scan the POD when you arrive.
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="bg-neutral-100 rounded-full px-4 py-3 text-sm text-neutral-400 flex justify-between items-center">
                <span>Type a message...</span>
                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </StickyFeature>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-24 bg-white border-b border-neutral-100 relative overflow-hidden">
      <div className="text-center mb-12">
        <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Trusted by industry leaders</span>
      </div>

      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center pr-24"
        >
          {["DHL", "MAERSK", "FEDEX", "UPS", "DB SCHENKER", "KUEHNE+NAGEL", "CH ROBINSON", "XPO"].map((logo, i) => (
            <span key={i} className={`text-4xl font-bold text-neutral-300 select-none ${i % 2 === 0 ? 'font-serif' : 'font-sans'}`}>
              {logo}
            </span>
          ))}
          {["DHL", "MAERSK", "FEDEX", "UPS", "DB SCHENKER", "KUEHNE+NAGEL", "CH ROBINSON", "XPO"].map((logo, i) => (
            <span key={`dup-${i}`} className={`text-4xl font-bold text-neutral-300 select-none ${i % 2 === 0 ? 'font-serif' : 'font-sans'}`}>
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h3 className="text-4xl md:text-6xl font-serif leading-tight mb-12 text-neutral-900">
              "DriveOps isn't just software. It's the nervous system of our entire logistics network."
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-full overflow-hidden">
                <div className="w-full h-full bg-neutral-200"></div>
              </div>
              <div>
                <div className="font-medium text-lg">Alexander Vane</div>
                <div className="text-neutral-500">VP Operations, GlobalFreight</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-8 rounded-2xl">
              <div className="text-5xl font-serif text-neutral-900 mb-2">20%</div>
              <div className="text-neutral-500">Reduction in fuel costs within 3 months</div>
            </div>
            <div className="bg-neutral-900 text-white p-8 rounded-2xl">
              <div className="text-5xl font-serif mb-2">15hr</div>
              <div className="text-neutral-400">Weekly admin time saved per dispatcher</div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl col-span-2">
              <div className="text-5xl font-serif text-neutral-900 mb-2">99.9%</div>
              <div className="text-neutral-500">Uptime for critical fleet operations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-32 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* CTA Block */}
        <div className="mb-32 border-b border-white/10 pb-32">
          <h2 className="text-6xl md:text-8xl font-serif tracking-tight mb-12">
            Ready to <br /> move?
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <button className="bg-white text-neutral-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-neutral-200 transition-colors">
              Start Free Trial
            </button>
            <button className="text-white border border-white/20 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-2xl font-serif font-semibold tracking-tight">DriveOps.</a>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              All Systems Operational
            </div>
          </div>

          <div className="flex flex-col gap-8 text-right mt-12 md:mt-0">
            <a href="#" className="text-2xl hover:text-neutral-400 transition-colors">hamzaatig@icloud.com</a>
            <div className="flex gap-8 justify-end">
              <a href="https://atig.me" className="text-neutral-400 hover:text-white transition-colors">Portfolio</a>
              <a href="https://linkedin.com/in/hamza-atig" className="text-neutral-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com/Atig-Hamza" className="text-neutral-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-sm text-neutral-500">
          <div className="flex gap-8 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div>© 2025 DriveOps, Created, Designed and Developed by Hamza Atig</div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div className="bg-white selection:bg-neutral-900 selection:text-white font-sans text-neutral-900">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;