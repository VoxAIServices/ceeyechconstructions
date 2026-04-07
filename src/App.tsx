/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Route, 
  Landmark, 
  Construction, 
  Hammer, 
  Ruler, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

import logoImg from './site-assets/Gemini_Generated_Image_autffvautffvautf-removebg-preview.png';

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex-shrink-0">
      <img 
        src={logoImg} 
        alt="Ceeyech Construction"
        className="w-full h-full object-contain"
        style={{ background: "transparent" }}
      />
    </div>
    
    <div className="flex flex-col leading-none">
      <span className="font-display text-2xl tracking-wider text-white uppercase">Ceeyech</span>
      <span className="text-[0.55rem] font-bold tracking-[0.15em] text-concrete uppercase">Construction Pvt Ltd</span>
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-gradient-to-b from-black/95 to-transparent py-6'} px-6 md:px-16 flex justify-between items-center`}>
      <Logo />
      
      <ul className="hidden md:flex gap-10 items-center">
        {['Services', 'Projects', 'About'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="text-concrete hover:text-yellow text-sm font-semibold tracking-widest uppercase transition-colors">
              {item}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="bg-yellow text-black px-6 py-2 clip-btn-sm font-bold text-sm uppercase hover:bg-amber transition-colors">
            Get a Quote
          </a>
        </li>
      </ul>

      <button className="md:hidden text-yellow" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 border-t border-yellow/20 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Services', 'Projects', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-concrete hover:text-yellow text-lg font-semibold uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; delay: number }[]>([]);
  const [buildings, setBuildings] = useState<{ id: number; height: number; width: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4
    }));
    setStars(newStars);

    // Building configs
    const buildingConfigs = [
      { height: 220, width: 80, delay: 0.1, color: 'from-[#2a2d35] to-[#1e2028]' },
      { height: 300, width: 60, delay: 0.4, color: 'from-[#363028] to-[#28231a]' },
      { height: 420, width: 110, delay: 0.6, color: 'from-[#1e2a3a] to-[#141e2a]' },
      { height: 180, width: 70, delay: 0.3, color: 'from-[#30342a] to-[#22261c]' },
      { height: 520, width: 130, delay: 0.8, color: 'from-[#252830] to-[#161820]' },
      { height: 250, width: 55, delay: 0.5, color: 'from-[#2e2a22] to-[#201e18]' },
      { height: 460, width: 95, delay: 1.0, color: 'from-[#1a2830] to-[#10181e]' },
      { height: 200, width: 65, delay: 0.2, color: 'from-[#2a3020] to-[#1c2018]' },
      { height: 380, width: 85, delay: 0.9, color: 'from-[#282030] to-[#1a1420]' },
      { height: 500, width: 120, delay: 0.7, color: 'from-[#1e2830] to-[#121820]' },
    ];
    setBuildings(buildingConfigs.map((c, i) => ({ ...c, id: i })));
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#1a2035] to-[#1e1a0a]">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: star.delay }}
            className="absolute bg-white/70 rounded-full"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          />
        ))}
      </div>

      {/* Construction Scene */}
      <div className="absolute bottom-0 left-0 right-0 h-[75vh] flex items-end">
        {/* Buildings */}
        <div className="absolute bottom-0 left-0 right-0 h-full flex items-end px-8 gap-1">
          {buildings.map((b) => (
            <motion.div
              key={b.id}
              initial={{ scaleY: 0, opacity: 0.3 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 2.2, delay: b.delay, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex-shrink-0 origin-bottom bg-gradient-to-b ${b.color}`}
              style={{ width: b.width, height: b.height }}
            >
              <div className="absolute inset-x-1.5 inset-y-2.5 grid grid-cols-4 gap-1 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`h-3 rounded-sm ${Math.random() > 0.7 ? 'bg-yellow/60' : 'bg-yellow/5'}`} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Crane */}
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[18%] bottom-0 w-2 origin-bottom z-10"
        >
          <div className="w-2 h-[380px] bg-[repeating-linear-gradient(180deg,var(--color-yellow)_0,var(--color-yellow)_8px,var(--color-amber)_8px,var(--color-amber)_16px)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-2 bg-yellow">
            <div className="absolute right-0 top-2 w-0.5 h-[70px] bg-yellow/70" />
            <div className="absolute top-0 right-full w-[60px] h-2 bg-amber" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-4 bg-yellow" />
          </div>
        </motion.div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-[#1a1a14] to-[#0e0e0a] z-5" />

        {/* Road */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden z-6">
          <motion.div 
            initial={{ left: '-100%' }}
            animate={{ left: 0 }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute bottom-0 right-0 h-[58px] bg-[#222218] w-[200%]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-concrete/35" />
            <div className="absolute top-1/2 -translate-y-1/2 h-1 left-0 right-0 bg-[repeating-linear-gradient(90deg,var(--color-yellow)_0,var(--color-yellow)_40px,transparent_40px,transparent_80px)]" />
          </motion.div>
        </div>

        {/* Excavator */}
        <motion.div 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-14 left-[8%] z-[8]"
        >
          <svg width="120" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="60" height="28" rx="3" fill="#2a2820"/>
            <rect x="14" y="20" width="40" height="18" rx="2" fill="#363228"/>
            <rect x="18" y="23" width="18" height="11" rx="1" fill="rgba(245,197,24,0.25)"/>
            <line x1="55" y1="22" x2="88" y2="8" stroke="#f5c518" strokeWidth="5" strokeLinecap="round"/>
            <line x1="88" y1="8" x2="100" y2="30" stroke="#f5c518" strokeWidth="4" strokeLinecap="round"/>
            <path d="M98 30 L112 28 L110 42 L96 42 Z" fill="#e8860a"/>
            <rect x="5" y="55" width="72" height="12" rx="6" fill="#1a1814"/>
            <circle cx="16" cy="61" r="6" fill="#2a2820"/>
            <circle cx="30" cy="61" r="6" fill="#2a2820"/>
            <circle cx="44" cy="61" r="6" fill="#2a2820"/>
            <circle cx="58" cy="61" r="6" fill="#2a2820"/>
            <circle cx="68" cy="61" r="5" fill="#2a2820"/>
          </svg>
        </motion.div>
      </div>

      {/* Hero Copy */}
      <div className="relative z-20 px-6 md:px-16 pb-32 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="inline-block text-[0.75rem] font-bold tracking-[0.2em] uppercase text-yellow border border-yellow/40 px-4 py-1.5 mb-6 clip-btn bg-yellow/10"
        >
          Est. 2005 · Licensed & Bonded
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-wider mb-6"
        >
          We Build <span className="text-yellow block">The Future.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.6 }}
          className="text-concrete text-lg font-light leading-relaxed max-w-lg mb-10"
        >
          Roads that connect cities. Buildings that define skylines. From foundation to finish, Ceeyech Construction delivers precision-built infrastructure across India.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.8 }}
          className="flex flex-wrap gap-4"
        >
          <a href="#projects" className="bg-yellow text-black px-8 py-3.5 clip-btn font-bold uppercase hover:bg-amber transition-all transform hover:-translate-y-1">
            View Projects
          </a>
          <a href="#contact" className="border border-yellow/40 text-yellow px-8 py-3.5 clip-btn font-semibold uppercase hover:bg-yellow/10 transition-all">
            Free Estimate
          </a>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute right-6 md:right-16 bottom-10 z-30 flex flex-col items-center gap-2"
      >
        <motion.div 
          animate={{ scaleY: [0.6, 1, 0.6], y: [-10, 0, -10] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-12 bg-gradient-to-b from-yellow to-transparent"
        />
        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-steel [writing-mode:vertical-rl]">Scroll</span>
      </motion.div>
    </section>
  );
};

const StatItem = ({ target, label, suffix = '+' }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl text-black tracking-wider">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-black/60">
        {label}
      </div>
    </div>
  );
};

const StatsBar = () => (
  <div className="bg-yellow py-8 md:py-12 px-6 md:px-16 flex flex-wrap justify-around gap-8">
    <StatItem target={320} label="Projects Completed" />
    <StatItem target={18} label="Years Experience" />
    <StatItem target={1400} label="Road Laid" suffix="km" />
    <StatItem target={85} label="Expert Engineers" />
  </div>
);

const Services = () => {
  const services = [
    { icon: <Building2 className="w-10 h-10" />, name: "Building Construction", desc: "Residential complexes, commercial towers, industrial facilities — engineered to last with modern seismic standards." },
    { icon: <Route className="w-10 h-10" />, name: "Road & Highway Works", desc: "National highways, state roads, urban expressways. We lay asphalt that withstands monsoons and heavy freight loads." },
    { icon: <Landmark className="w-10 h-10" />, name: "Bridges & Flyovers", desc: "Pre-stressed concrete and steel bridges engineered for longevity. From rural crossings to urban elevated corridors." },
    { icon: <Construction className="w-10 h-10" />, name: "Civil Infrastructure", desc: "Water supply networks, sewage systems, drainage, retaining walls — complete civil works for all clients." },
    { icon: <Hammer className="w-10 h-10" />, name: "Structural Steel", desc: "Fabrication and erection of structural steel frames for warehouses, factories, and large-span buildings." },
    { icon: <Ruler className="w-10 h-10" />, name: "Project Management", desc: "Full-cycle project management: planning, tendering, execution, quality control, and handover — on time." },
  ];

  return (
    <section id="services" className="bg-dark py-28 px-6 md:px-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-yellow text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-4"
      >
        What We Do
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-6xl tracking-wider mb-16"
      >
        Core Services
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-yellow/10">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#141410] p-10 border-t-4 border-transparent hover:border-yellow transition-all group relative overflow-hidden"
          >
            <div className="text-yellow mb-6 group-hover:scale-110 transition-transform duration-300">
              {s.icon}
            </div>
            <h3 className="font-display text-2xl tracking-wider mb-4">{s.name}</h3>
            <p className="text-steel text-sm leading-relaxed">{s.desc}</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const RoadWork = () => (
  <section id="road-work" className="bg-[#0d0d0a] py-28 px-6 md:px-16 overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-yellow text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-4"
        >
          Specialisation
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl tracking-wider mb-8"
        >
          Road Works<br />& Surfacing
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-concrete leading-relaxed mb-8"
        >
          Our road division handles everything from sub-grade preparation to wearing-course laying. We operate a fleet of modern paving machinery including vibratory rollers, sensor pavers, and cold milling machines.
        </motion.p>
        <ul className="space-y-4">
          {['Asphalt & Bituminous Surfacing', 'Rigid Pavement (Concrete Roads)', 'Road Markings & Safety Works', 'Drainage & Shoulder Works'].map((item, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 text-steel"
            >
              <div className="w-2 h-2 bg-yellow rotate-45" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative h-[400px] border border-yellow/15 bg-gradient-to-t from-[#1a1a14] to-[#0d0d0a] overflow-hidden"
      >
        <div className="absolute top-4 left-4 font-display text-sm tracking-widest text-yellow/50">LIVE SIMULATION</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-full bg-[#222218] [transform:perspective(500px)_rotateX(60deg)] overflow-hidden">
            <div className="absolute left-[20%] w-1 h-full bg-white/10" />
            <div className="absolute right-[20%] w-1 h-full bg-white/10" />
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-12 bg-yellow rounded-sm animate-road-move" style={{ top: '0%' }} />
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-12 bg-yellow rounded-sm animate-road-move" style={{ top: '33%', animationDelay: '-0.33s' }} />
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-12 bg-yellow rounded-sm animate-road-move" style={{ top: '66%', animationDelay: '-0.66s' }} />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Projects = () => {
  const projects = [
    { name: "Ceeyech Towers Phase II — Bangalore", cat: "Commercial Building", icon: "🏙️", size: "large" },
    { name: "NH-48 Widening Project", cat: "National Highway", icon: "🛣️" },
    { name: "Kaveri River Flyover", cat: "Bridge", icon: "🌉" },
    { name: "Mysuru Logistics Hub", cat: "Industrial Facility", icon: "🏗️" },
    { name: "Green Valley Housing", cat: "Residential", icon: "🏘️" },
  ];

  return (
    <section id="projects" className="bg-dark py-28 px-6 md:px-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-yellow text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-4"
      >
        Portfolio
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-6xl tracking-wider mb-12"
      >
        Recent Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-yellow/10">
        {projects.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative group overflow-hidden bg-[#1a1a14] min-h-[250px] ${p.size === 'large' ? 'lg:col-span-2 lg:row-span-2 min-h-[500px]' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-steel/20 to-black/80 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
              {p.icon}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
              <div className="text-yellow text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">{p.cat}</div>
              <div className="font-display text-2xl tracking-wider">{p.name}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Process = () => (
  <section id="process" className="bg-black py-28 px-6 md:px-16">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-yellow text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-4"
    >
      How We Work
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-display text-4xl md:text-6xl tracking-wider mb-16"
    >
      Our Process
    </motion.h2>
    <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
      <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow to-transparent hidden lg:block" />
      {[
        { num: "01", title: "Site Survey", desc: "Geotechnical analysis and soil testing to understand site conditions fully." },
        { num: "02", title: "Engineering Design", desc: "Structural drawings prepared by licensed engineers, reviewed against IS codes." },
        { num: "03", title: "Approvals", desc: "We handle all necessary government clearances and building plan approvals." },
        { num: "04", title: "Construction", desc: "On-site execution with daily progress reports and quality checks at every stage." },
        { num: "05", title: "Handover", desc: "Final snag list clearance, as-built drawings, and warranties delivered to you." },
      ].map((step, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative z-10"
        >
          <div className="w-14 h-14 border-2 border-yellow flex items-center justify-center font-display text-2xl text-yellow mb-6 bg-black clip-btn">
            {step.num}
          </div>
          <h3 className="font-display text-xl tracking-wider mb-3">{step.title}</h3>
          <p className="text-steel text-sm leading-relaxed">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const About = () => (
  <section id="about" className="bg-dark py-28 px-6 md:px-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="aspect-[4/3] bg-gradient-to-br from-[#1a2030] to-[#0d1420] border border-yellow/15 flex items-center justify-center text-9xl relative overflow-hidden">
          🏗️
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(245,197,24,0.03)_20px,rgba(245,197,24,0.03)_21px)]" />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-yellow p-6 text-center clip-btn shadow-2xl">
          <div className="font-display text-4xl text-black leading-none">18+</div>
          <div className="text-[0.65rem] font-bold tracking-widest uppercase text-black/60">Years of<br />Excellence</div>
        </div>
      </motion.div>
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-yellow text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-4"
        >
          About Us
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl tracking-wider mb-8"
        >
          Built on Trust,<br />Delivered on Time
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-concrete leading-relaxed mb-6"
        >
          Ceeyech Construction Co. was founded in 2005 with a simple mission: build infrastructure that India is proud of. Today, we are one of South India's leading construction firms.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-concrete leading-relaxed mb-10"
        >
          Our team of 85+ engineers brings deep expertise across road and building works. Every project is treated with the same commitment to quality.
        </motion.p>
        <div className="grid grid-cols-2 gap-8">
          {[
            { val: "ISO", lbl: "9001:2015 Certified" },
            { val: "AA+", lbl: "CRISIL Credit Rating" },
            { val: "₹0", lbl: "Outstanding Disputes" },
            { val: "24/7", lbl: "Site Support" },
          ].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-4 border-yellow pl-4"
            >
              <div className="font-display text-3xl text-yellow leading-none mb-1">{h.val}</div>
              <div className="text-[0.72rem] text-steel tracking-widest uppercase">{h.lbl}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="bg-[#0d0d0a] py-28 px-6 md:px-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-yellow text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-4"
      >
        Get In Touch
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-6xl tracking-wider mb-12"
      >
        Start Your Project
      </motion.h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[0.72rem] font-bold tracking-widest uppercase text-steel">Full Name</label>
              <input required type="text" className="bg-[#141410] border border-concrete/20 text-white p-4 outline-none focus:border-yellow transition-colors clip-btn" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.72rem] font-bold tracking-widest uppercase text-steel">Phone Number</label>
              <input required type="tel" className="bg-[#141410] border border-concrete/20 text-white p-4 outline-none focus:border-yellow transition-colors clip-btn" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.72rem] font-bold tracking-widest uppercase text-steel">Email Address</label>
            <input required type="email" className="bg-[#141410] border border-concrete/20 text-white p-4 outline-none focus:border-yellow transition-colors clip-btn" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.72rem] font-bold tracking-widest uppercase text-steel">Project Type</label>
            <select className="bg-[#141410] border border-concrete/20 text-white p-4 outline-none focus:border-yellow transition-colors clip-btn">
              <option>Building Construction</option>
              <option>Road / Highway Works</option>
              <option>Bridge / Flyover</option>
              <option>Civil Infrastructure</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.72rem] font-bold tracking-widest uppercase text-steel">Project Details</label>
            <textarea required className="bg-[#141410] border border-concrete/20 text-white p-4 outline-none focus:border-yellow transition-colors clip-btn min-h-[150px] resize-none" />
          </div>
          <button 
            disabled={status !== 'idle'}
            className={`bg-yellow text-black py-4 clip-btn font-bold uppercase transition-all flex items-center justify-center gap-2 ${status === 'idle' ? 'hover:bg-amber' : ''}`}
          >
            {status === 'idle' && <>Send Enquiry <ChevronRight className="w-5 h-5" /></>}
            {status === 'sending' && "Sending..."}
            {status === 'success' && <><CheckCircle2 className="w-5 h-5" /> Enquiry Sent!</>}
          </button>
        </motion.form>

        <div className="flex flex-col gap-10">
          {[
            { icon: <MapPin />, label: "Head Office", val: "42 Industrial Layout, Peenya, Bengaluru – 560 058" },
            { icon: <Phone />, label: "Phone", val: "+91 80 2345 6789" },
            { icon: <Mail />, label: "Email", val: "info@ceeyech.in" },
            { icon: <Clock />, label: "Working Hours", val: "Mon – Sat: 8:00 AM – 6:00 PM" },
          ].map((info, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 bg-yellow/10 border border-yellow/20 flex items-center justify-center text-yellow flex-shrink-0">
                {info.icon}
              </div>
              <div>
                <div className="text-[0.68rem] font-bold tracking-widest uppercase text-steel mb-1">{info.label}</div>
                <div className="text-white">{info.val}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#070706] py-12 px-6 md:px-16 border-t border-yellow/10 flex flex-col md:flex-row justify-between items-center gap-8">
    <Logo />
    <nav className="flex gap-8">
      {['Services', 'Projects', 'About', 'Contact'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="text-steel hover:text-yellow text-[0.78rem] font-semibold uppercase tracking-widest transition-colors">
          {item}
        </a>
      ))}
    </nav>
    <div className="text-[0.75rem] text-steel/50">
      © 2025 Ceeyech Construction Co. All rights reserved.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black selection:bg-yellow selection:text-black">
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <RoadWork />
      <Projects />
      <Process />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
