import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Check, ChevronRight,
  BarChart2, Map, Shield, Truck, Users, Globe,
  ArrowUpRight, Play
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
      <StickyFeature
        number="1"
        title="Real-Time Visibility"
        description="See your entire operation at a glance. Live GPS tracking, status updates, and predictive ETAs for every asset in your fleet."
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-xl border border-neutral-100 p-6 relative">
            <div className="absolute top-6 right-6 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="mt-8 space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded border border-neutral-200"></div>
                    <div className="w-24 h-3 bg-neutral-200 rounded"></div>
                  </div>
                  <div className="w-12 h-3 bg-neutral-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StickyFeature>

      <StickyFeature
        number="2"
        title="Predictive Maintenance"
        description="Stop reacting to breakdowns. Our AI analyzes mileage and usage patterns to schedule service before issues occur."
      >
        <div className="absolute inset-0 bg-neutral-900 p-12 text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Shield className="w-12 h-12 text-neutral-400" strokeWidth={1} />
            <div className="text-right">
              <div className="text-3xl font-mono">14,203</div>
              <div className="text-sm text-neutral-500">Miles to Service</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Oil Life</span>
              <span>82%</span>
            </div>
            <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full w-[82%] bg-white"></div>
            </div>
          </div>
        </div>
      </StickyFeature>

      <StickyFeature
        number="3"
        title="Driver Workflow"
        description="Empower your team with a mobile experience they'll actually enjoy. Digital logs, instant document scanning, and seamless communication."
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F7]">
          <div className="w-[280px] h-[560px] bg-white rounded-[40px] border-[8px] border-neutral-900 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-24 bg-neutral-50 border-b border-neutral-100 p-6 pt-12">
              <div className="text-lg font-bold">Today's Route</div>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-neutral-900 text-white rounded-xl shadow-lg">
                <div className="text-xs text-neutral-400 mb-1">Current Stop</div>
                <div className="font-medium">Distribution Center A</div>
              </div>
              <div className="p-4 bg-white border border-neutral-100 rounded-xl">
                <div className="text-xs text-neutral-400 mb-1">Next Stop</div>
                <div className="font-medium">Retail Location B</div>
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
    <div className="py-20 bg-neutral-900 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center pr-20"
        >
          {["DHL", "MAERSK", "FEDEX", "UPS", "DB SCHENKER", "KUEHNE+NAGEL", "CH ROBINSON", "XPO"].map((logo, i) => (
            <span key={i} className="text-4xl font-serif font-bold text-neutral-700 select-none">
              {logo}
            </span>
          ))}
          {["DHL", "MAERSK", "FEDEX", "UPS", "DB SCHENKER", "KUEHNE+NAGEL", "CH ROBINSON", "XPO"].map((logo, i) => (
            <span key={`dup-${i}`} className="text-4xl font-serif font-bold text-neutral-700 select-none">
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
    <section className="py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <h3 className="text-4xl md:text-6xl font-serif leading-tight max-w-5xl mx-auto mb-16 text-neutral-900">
          "DriveOps isn't just software. It's the nervous system of our entire logistics network. We've never been faster."
        </h3>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-neutral-100 rounded-full overflow-hidden">
            {/* Placeholder for headshot */}
            <div className="w-full h-full bg-neutral-200"></div>
          </div>
          <div>
            <div className="font-medium text-lg">Alexander Vane</div>
            <div className="text-neutral-500">VP Operations, GlobalFreight</div>
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
        <div className="flex flex-col md:flex-row justify-between items-start mb-32">
          <h2 className="text-6xl md:text-8xl font-serif tracking-tight mb-12 md:mb-0">
            Let's move <br /> the world.
          </h2>
          <div className="flex flex-col gap-8 text-right">
            <a href="#" className="text-2xl hover:text-neutral-400 transition-colors">hello@driveops.com</a>
            <div className="flex gap-8 justify-end">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-sm text-neutral-500">
          <div className="flex gap-8 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div>© 2024 DriveOps Inc. Zurich • San Francisco</div>
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