import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Check, ChevronRight,
  BarChart2, Map, Shield, Truck, Users, Globe,
  ArrowUpRight, Play, Battery, Zap, MessageSquare, FileText, Bell,
  Search, Sliders, MoreHorizontal, Navigation, Smartphone
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-100 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-neutral-900 flex items-center gap-1">
          DriveOps
          <div className="w-2 h-2 rounded-full bg-neutral-900 mt-2"></div>
        </a>
        <div className="hidden md:flex items-center bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-neutral-100 gap-8 shadow-sm">
          <a href="#product" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Product</a>
          <a href="#solutions" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Solutions</a>
          <a href="#pricing" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors px-4">Log in</a>
          <a href="/register" className="bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-neutral-900/20">
            Get Started
          </a>
        </div>
      </div>
    </nav >
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-9xl font-serif font-medium text-neutral-900 leading-[0.9] tracking-tight mb-8">
                Master <br />
                <span className="text-neutral-400 italic">the</span> Motion.
              </h1>
              <p className="text-2xl text-neutral-600 max-w-md leading-relaxed mb-10 font-light tracking-wide">
                The operating system for modern logistics.
                Orchestrate your entire fleet from a single, beautiful command center.
              </p>
              <div className="flex items-center gap-6">
                <button className="group flex items-center gap-3 bg-neutral-900 text-white pl-8 pr-6 py-4 rounded-full text-lg transition-all hover:bg-neutral-800 shadow-xl shadow-neutral-900/20">
                  Start Trial
                  <span className="w-8 h-8 bg-white text-neutral-900 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <button className="flex items-center gap-3 text-neutral-900 font-medium px-6 py-4 rounded-full border border-neutral-200 hover:bg-white hover:border-neutral-300 transition-all bg-white/50 backdrop-blur-sm">
                  <Play className="w-4 h-4 fill-current" />
                  Showreel
                </button>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[700px] hidden lg:block perspective-1000">
            <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[90%] z-10">
              <div className="aspect-[4/5] bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 p-2 ring-1 ring-neutral-900/5">
                <div className="w-full h-full bg-[#F5F5F5] rounded-2xl relative overflow-hidden">

                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Decorative Roads */}
                    <path d="M -20 100 L 600 250" fill="none" stroke="#e5e5e5" strokeWidth="12" />
                    <path d="M 200 -20 L 150 600" fill="none" stroke="#e5e5e5" strokeWidth="12" />

                    {/* Main Route Background */}
                    <path
                      d="M 120 100 Q 150 200 250 250 T 400 350"
                      fill="none"
                      stroke="#e5e5e5"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Active Route */}
                    <motion.path
                      d="M 120 100 Q 150 200 250 250 T 400 350"
                      fill="none"
                      stroke="#171717"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />

                    {/* Vehicle */}
                    <motion.g
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="0" cy="0" r="12" fill="#000" fillOpacity="0.1">
                        <animateMotion path="M 120 100 Q 150 200 250 250 T 400 350" dur="10s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="0" cy="0" r="4" fill="#000">
                        <animateMotion path="M 120 100 Q 150 200 250 250 T 400 350" dur="10s" repeatCount="indefinite" />
                      </circle>
                    </motion.g>

                    {/* Start/End Points */}
                    <circle cx="120" cy="100" r="4" fill="#fff" stroke="#171717" strokeWidth="2" />
                    <circle cx="400" cy="350" r="4" fill="#171717" />
                  </svg>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-24 left-8 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 w-72 ring-1 ring-black/5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neutral-100 to-neutral-50 flex items-center justify-center border border-white shadow-sm">
                          <Users className="w-5 h-5 text-neutral-900" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-neutral-900">Michael R.</div>
                          <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Driver • ID #892</div>
                        </div>
                      </div>
                      <div className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        ON TIME
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative pl-4 border-l-2 border-dashed border-neutral-200 space-y-5">
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-[3px] border-neutral-900 bg-white shadow-sm"></div>
                          <div className="text-[10px] text-neutral-400 mb-0.5 uppercase tracking-wide">Origin</div>
                          <div className="text-sm font-semibold text-neutral-900">San Francisco, CA</div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-[3px] border-neutral-300 bg-white"></div>
                          <div className="text-[10px] text-neutral-400 mb-0.5 uppercase tracking-wide">Destination</div>
                          <div className="text-sm font-semibold text-neutral-900">Los Angeles, CA</div>
                          <div className="text-xs text-neutral-600 mt-1.5 font-medium bg-neutral-100 inline-block px-2 py-1 rounded-md">ETA 14:45</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-24 right-8 bg-[#1A1A1A] text-white p-4 rounded-xl shadow-2xl w-52 z-20 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                      <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-semibold">System Alert</div>
                    </div>
                    <div className="text-sm font-medium mb-1">Maintenance Due</div>
                    <div className="text-xs text-neutral-400 mb-3">Vehicle #402 brake check</div>
                    <button className="w-full bg-white text-neutral-950 text-xs font-bold py-2.5 rounded-lg hover:bg-neutral-200 transition-colors">
                      Schedule
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="absolute bottom-12 -left-12 w-[60%] z-0">
              <div className="aspect-square bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-neutral-100 p-8 flex flex-col justify-between backdrop-blur-3xl ring-1 ring-neutral-900/5">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
                      <BarChart2 className="w-6 h-6 text-neutral-900" />
                    </div>
                    <span className="text-emerald-600 text-sm font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" /> 12.5%
                    </span>
                  </div>
                  <div className="text-5xl font-serif font-medium text-neutral-900 mb-2 tracking-tight">98.2%</div>
                  <div className="text-sm text-neutral-500 font-medium">Fleet Efficiency Rating</div>
                </div>
                <div className="h-32 flex items-end gap-3">
                  {[40, 65, 50, 80, 60, 90, 85].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                      className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-neutral-900' : 'bg-neutral-200'}`}
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

const FeatureSection = ({ number, title, description, children, align = "right" }) => {
  return (
    <div className="py-24 border-t border-neutral-100/50 relative group">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-20 items-center">
        <div className={'flex flex-col justify-center ' + (align === "left" ? "lg:order-2" : "")}>
          <div className="flex items-center gap-4 mb-8">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-sm font-mono text-neutral-500 bg-neutral-50">
              0{number}
            </span>
            <div className="h-px w-12 bg-neutral-200"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-6 leading-[1.1] tracking-tight">{title}</h2>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-md mb-8">{description}</p>
          <ul className="space-y-4 mb-10">
            {['Real-time synchronization', 'Automated reporting', 'Encryption level security'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-neutral-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <div>
            <button className="text-neutral-900 font-semibold border-b-2 border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-400 transition-all flex items-center gap-2 group/btn">
              Explore Feature
              <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        <div className={`relative ${align === "left" ? "lg:order-1" : ""}`}>
          <div className="w-full max-w-xl mx-auto relative">
            <div className="absolute inset-0 bg-neutral-100/50 transform rotate-3 rounded-3xl z-0 scale-[0.95]"></div>
            <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] z-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};

const Marquee = () => {
  return (
    <div className="py-20 bg-white border-b border-neutral-100 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-12 flex justify-center">
        <div className="px-4 py-1.5 rounded-full border border-neutral-100 bg-neutral-50 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          Powering Global Logistics
        </div>
      </div>
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="flex whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-500">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 items-center pr-32"
        >
          {["DHL", "MAERSK", "FEDEX", "UPS", "DB SCHENKER", "KUEHNE+NAGEL", "CH ROBINSON", "XPO"].map((logo, i) => (
            <span key={i} className={`text-4xl font-bold text-neutral-900 select-none ${i % 2 === 0 ? 'font-serif tracking-tighter' : 'font-sans tracking-tight'}`}>
              {logo}
            </span>
          ))}
          {["DHL", "MAERSK", "FEDEX", "UPS", "DB SCHENKER", "KUEHNE+NAGEL", "CH ROBINSON", "XPO"].map((logo, i) => (
            <span key={`dup-${i}`} className={`text-4xl font-bold text-neutral-900 select-none ${i % 2 === 0 ? 'font-serif tracking-tighter' : 'font-sans tracking-tight'}`}>
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </div>

  );
};

const Features = () => {
  return (
    <section className="bg-white">
      <Marquee />
      <FeatureSection
        number="1"
        title="Total Visibility"
        description="See your entire operation at a glance. Live GPS tracking, status updates, and predictive ETAs for every asset in your fleet."
      >
        <div className="absolute inset-0 bg-neutral-50 p-6 flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 flex-1 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Map className="w-4 h-4 text-neutral-600" />
                </div>
                <div className="font-semibold text-neutral-900">Fleet Command</div>
              </div>
              <div className="flex gap-2">
                <Search className="w-4 h-4 text-neutral-400" />
                <Sliders className="w-4 h-4 text-neutral-400" />
              </div>
            </div>

            <div className="flex-1 relative bg-neutral-100/50">
              <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>

              {[
                { id: "V-402", top: "20%", left: "30%", status: "active" },
                { id: "V-405", top: "60%", left: "70%", status: "idle" },
                { id: "V-409", top: "40%", left: "50%", status: "active" },
              ].map((pin, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: pin.top, left: pin.left }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="relative group cursor-pointer">
                    <div className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${pin.status === 'active' ? 'bg-neutral-900' : 'bg-neutral-400'}`}></div>
                    {pin.status === 'active' && <div className="absolute inset-0 w-3 h-3 rounded-full bg-neutral-900 animate-ping opacity-20"></div>}

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">
                      {pin.id}
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-neutral-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-bold text-sm text-neutral-900">Unit 409</div>
                      <div className="text-[10px] font-mono text-neutral-400">65 MPH</div>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-900"
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        transition={{ duration: 1.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FeatureSection>

      <FeatureSection
        number="2"
        title="Predictive Health"
        description="Stop reacting to breakdowns. Our AI analyzes mileage and usage patterns to schedule service before issues occur."
        align="left"
      >
        <div className="absolute inset-0 bg-[#0A0A0A] p-6 text-white flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="flex justify-between items-start z-10">
            <div>
              <div className="text-xs font-mono text-neutral-400 mb-1">UNIT #892</div>
              <div className="text-2xl font-semibold tracking-tight">System Diagnostics</div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
              <Zap className="w-5 h-5 text-orange-400 fill-current" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 z-10 my-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <Battery className="w-5 h-5 text-neutral-400" />
                <span className="text-xs font-bold text-green-400">GOOD</span>
              </div>
              <div className="text-3xl font-mono font-medium">94%</div>
              <div className="text-xs text-neutral-500 mt-1">Battery Health</div>
            </div>
            <div className="bg-orange-500/10 rounded-2xl p-4 border border-orange-500/20 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <Shield className="w-5 h-5 text-orange-400" />
                <span className="text-xs font-bold text-orange-400 animate-pulse">ALERT</span>
              </div>
              <div className="text-3xl font-mono font-medium text-white relative z-10">32<span className="text-sm opacity-50">PSI</span></div>
              <div className="text-xs text-orange-200/60 mt-1 relative z-10">Tire Pressure Low</div>
            </div>
          </div>

          <div className="space-y-3 z-10">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Engine Temperature</span>
              <span>Normal Range</span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[40, 42, 45, 48, 42, 40, 45, 50, 55, 60, 58, 55, 50, 45, 40].map((h, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t-sm ${h > 55 ? 'bg-orange-500' : 'bg-neutral-700'}`}
                  initial={{ height: "10%" }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>

          <button className="w-full bg-white text-black font-semibold py-3 rounded-xl mt-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 z-10 text-sm">
            Schedule Service
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </FeatureSection>

      <FeatureSection
        number="3"
        title="Driver Workflow"
        description="Empower your team with a mobile experience they'll actually enjoy. Digital logs, instant document scanning, and seamless communication."
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[#F2F2F2]">
          <div className="w-[280px] h-[90%] bg-white rounded-[40px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] border-[6px] border-neutral-900 overflow-hidden relative flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral-900 rounded-b-2xl z-20"></div>

            <div className="bg-neutral-900 pt-12 pb-6 px-5 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold">JD</div>
                  <div>
                    <div className="text-sm font-bold">Dispatch</div>
                    <div className="text-[10px] text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-neutral-400" />
              </div>
            </div>

            <div className="flex-1 bg-neutral-50 p-4 space-y-4 overflow-hidden relative">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex gap-2 max-w-[85%]"
                >
                  <div className="p-3 bg-white rounded-2xl rounded-tl-sm shadow-sm border border-neutral-100 text-xs leading-relaxed text-neutral-600">
                    New load assignment available near you.
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-2 max-w-[90%]"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-neutral-100 overflow-hidden w-full">
                    <div className="h-24 bg-neutral-100 relative">
                      <Map className="absolute inset-0 m-auto text-neutral-300 w-8 h-8" />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-bold text-neutral-900 mb-1">Load #8921</div>
                      <div className="text-[10px] text-neutral-500 flex justify-between">
                        <span>24 Pallets</span>
                        <span>$1,240</span>
                      </div>
                      <button className="w-full mt-3 bg-neutral-900 text-white text-[10px] font-bold py-2 rounded-lg">Accept Load</button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-2 max-w-[85%] ml-auto justify-end"
                >
                  <div className="p-3 bg-neutral-900 text-white rounded-2xl rounded-tr-sm shadow-sm text-xs leading-relaxed">
                    On it. ETA 20 mins.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-3 bg-white border-t border-neutral-100">
              <div className="h-10 bg-neutral-100 rounded-full flex items-center px-4 justify-between">
                <span className="text-xs text-neutral-400">Message...</span>
                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="w-32 h-1 bg-neutral-200 rounded-full mx-auto mt-4"></div>
            </div>
          </div>
        </div>
      </FeatureSection>
    </section>

  );
};

const Testimonial = () => {
  return (
    <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-800/20 skew-x-12"></div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="mb-12">
              <QuoteIcon />
            </div>
            <h3 className="text-4xl md:text-5xl font-serif leading-[1.2] mb-12 text-white/90">
              "DriveOps isn't just software. It is the nervous system of our entire logistics network. We've cut admin time by half."
            </h3>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-full overflow-hidden border-2 border-white/20">
                <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-900 font-bold text-xl">AV</div>
              </div>
              <div>
                <div className="font-bold text-lg">Alexander Vane</div>
                <div className="text-neutral-400 text-sm">VP Operations, GlobalFreight</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10"
            >
              <div className="text-3xl font-serif text-white mb-2">20%</div>
              <div className="text-sm text-neutral-400 leading-relaxed">Reduction in fuel costs within first 3 months</div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white text-neutral-900 p-6 rounded-3xl border border-white"
            >
              <div className="text-3xl font-serif mb-2">15hr</div>
              <div className="text-sm text-neutral-500 leading-relaxed">Weekly admin time saved per dispatcher</div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 col-span-2 flex items-center justify-between"
            >
              <div>
                <div className="text-3xl font-serif text-white mb-2">99.9%</div>
                <div className="text-sm text-neutral-400">Uptime for critical fleet operations</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="text-right">
                <div className="text-3xl font-serif text-white mb-2">ROI</div>
                <div className="text-sm text-neutral-400">Positive in 45 days</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

  );
};

const QuoteIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H10C10.5304 21 11.0391 20.7893 11.4142 20.4142C11.7893 20.0391 12 19.5304 12 19V13C12 12.4696 11.7893 11.9609 11.4142 11.5858C11.0391 11.2107 10.5304 11 10 11V11ZM10 11V7C10 6.20435 10.3161 5.44129 10.8787 4.87868C11.4413 4.31607 12.2044 4 13 4M20 11H16C15.4696 11 14.9609 11.2107 14.5858 11.5858C14.2107 11.9609 14 12.4696 14 13V19C14 19.5304 14.2107 20.0391 14.5858 20.4142C14.9609 20.7893 15.4696 21 16 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V13C22 12.4696 21.7893 11.9609 21.4142 11.5858C21.0391 11.2107 20.5304 11 20 11V11ZM20 11V7C20 6.20435 20.3161 5.44129 20.8787 4.87868C21.4413 4.31607 22.2044 4 23 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Footer = () => {
  return (
    <footer className="bg-white text-neutral-900 pt-32 pb-12 border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-32">
          <h2 className="text-7xl md:text-[8rem] font-serif tracking-tighter leading-[0.9] mb-12">
            Ready to <br />
            <span className="text-neutral-300">move?</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <button className="bg-neutral-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-neutral-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Start Free Trial
            </button>
            <button className="text-neutral-900 px-10 py-5 rounded-full text-lg font-medium border border-neutral-200 hover:bg-neutral-50 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 border-t border-neutral-100 pt-16">
          <div className="col-span-2">
            <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-neutral-900 mb-6 block">
              DriveOps.
            </a>
            <p className="text-neutral-500 max-w-sm">
              Reimagining how the world moves. The intelligent operating system for forward-thinking logistics teams.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Product</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Solutions</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><a href="#" className="hover:text-neutral-900 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <div className="flex gap-8 mb-4 md:mb-0">
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a>
          </div>
          <div className="flex gap-6 items-center">
            <span>© 2025 DriveOps Inc.</span>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/hamza-atig" className="text-neutral-400 hover:text-neutral-900 transition-colors">Ln</a>
              <a href="https://github.com/Atig-Hamza" className="text-neutral-400 hover:text-neutral-900 transition-colors">Gh</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
};

const AuthorContact = () => {
  return (
    <div className="w-full bg-neutral-900 text-white py-1 px-4 z-[100] fixed top-0 left-0 right-0 shadow-md">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="font-medium tracking-wide">
            Open to Work
          </span>
          <span className="text-neutral-500 hidden md:inline">|</span>
          <span className="font-normal text-neutral-200">hamza atig</span>
        </div>

        <div className="hidden md:block text-neutral-400 text-center flex-1 px-8 truncate">
          This project is a work in progress. Recruiters feel free to reach out.
        </div>

        <a
          href="mailto:hamzaatig@icloud.com"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-[6px] rounded-full border border-white/10 text-neutral-200 hover:text-white group"
        >
          <span>hamzaatig@icloud.com</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <AuthorContact />
      <div className="bg-white selection:bg-neutral-900 selection:text-white font-sans text-neutral-900 antialiased pt-10">
        <Navbar />
        <Hero />
        <Features />
        <Testimonial />
        <Footer />
      </div>
    </>
  );
};

export default Home;