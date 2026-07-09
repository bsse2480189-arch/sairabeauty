import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors, Sparkles, Smile, Star, MessageSquare, Calendar, Phone, ArrowRight,
  MapPin, Mail, Clock, ChevronDown, Check, CheckCircle, ShieldAlert, Heart,
  Instagram, BookOpen, AlertCircle, RefreshCw, Send, Sparkle, Search
} from 'lucide-react';

// Subcomponents & Data
import Header from './components/Header';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import StaffDashboard from './components/StaffDashboard';
import { services, categories } from './data/services';
import { deals } from './data/deals';
import { galleryItems } from './data/gallery';
import { Appointment, UserProfile, GalleryItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryItem | null>(null);

  // Persistence: Appointments Database State
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const local = localStorage.getItem('saira_appointments');
    if (local) return JSON.parse(local);
    // Seed initial appointments for beautiful reports
    return [
      {
        id: 'SAIRA-102941',
        customerName: 'Fatima Balouch',
        phone: '0300-4821820',
        whatsapp: '0300-4821820',
        email: 'fatima@gmail.com',
        serviceId: 'br-traditional',
        serviceName: 'Traditional Bridal Makeup (Day 1)',
        price: 35000,
        staffName: 'Saira Magsi (Senior Beautician)',
        date: '2026-07-15',
        time: '12:00 PM',
        notes: 'Needs heavy smokey eye makeup with matching dupatta pinning.',
        status: 'confirmed',
        dateCreated: '2026-07-08T10:00:00.000Z'
      },
      {
        id: 'SAIRA-849201',
        customerName: 'Ayesha Magsi',
        phone: '0312-1738291',
        whatsapp: '0312-1738291',
        email: 'ayesha.magsi@gmail.com',
        serviceId: 'fc-janssen',
        serviceName: 'Janssen Whitening Facial',
        price: 35000,
        staffName: 'Aqsa Balouch',
        date: '2026-07-10',
        time: '02:00 PM',
        notes: 'Sensitive skin. Prefers organic creams if available.',
        status: 'pending',
        dateCreated: '2026-07-09T08:00:00.000Z'
      },
      {
        id: 'SAIRA-472091',
        customerName: 'Hira Shah',
        phone: '0321-7291823',
        whatsapp: '0321-7291823',
        email: 'hira.shah@hotmail.com',
        serviceId: 'hc-simple',
        serviceName: 'Layers Hair Cut',
        price: 1500,
        staffName: 'Fiza Shah',
        date: '2026-07-08',
        time: '04:00 PM',
        status: 'completed',
        dateCreated: '2026-07-08T09:00:00.000Z'
      }
    ];
  });

  // Current Logged In User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const local = localStorage.getItem('saira_current_user');
    return local ? JSON.parse(local) : null;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('saira_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('saira_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('saira_current_user');
    }
  }, [currentUser]);

  // Dark Mode support
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle new appointment booking
  const handleBookingSuccess = (newApp: Appointment) => {
    setAppointments([newApp, ...appointments]);
    
    // Reward loyalty points to customer if logged in
    if (currentUser && currentUser.role === 'customer') {
      const updatedUser = {
        ...currentUser,
        loyaltyPoints: currentUser.loyaltyPoints + 50
      };
      setCurrentUser(updatedUser);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Lightbox index navigation
  const handlePrevLightbox = () => {
    if (!selectedLightboxItem) return;
    const idx = galleryItems.indexOf(selectedLightboxItem);
    const prevIdx = idx === 0 ? galleryItems.length - 1 : idx - 1;
    setSelectedLightboxItem(galleryItems[prevIdx]);
  };

  const handleNextLightbox = () => {
    if (!selectedLightboxItem) return;
    const idx = galleryItems.indexOf(selectedLightboxItem);
    const nextIdx = idx === galleryItems.length - 1 ? 0 : idx + 1;
    setSelectedLightboxItem(galleryItems[nextIdx]);
  };

  // 1. HOME VIEW COMPONENT
  const HomeView = () => {
    const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
    const [emailInput, setEmailInput] = useState('');
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);
    const [countdownTime, setCountdownTime] = useState({ days: 2, hours: 14, mins: 45, secs: 10 });

    // Ticking countdown timer for Limited deals
    useEffect(() => {
      const timer = setInterval(() => {
        setCountdownTime((prev) => {
          if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
          if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
          if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
          if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
          clearInterval(timer);
          return prev;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (emailInput) {
        setNewsletterSuccess(true);
        setEmailInput('');
        setTimeout(() => setNewsletterSuccess(false), 4000);
      }
    };

    const signatureServices = [
      { id: 'br-traditional', name: 'Bridal Makeup', icon: <Sparkles className="text-brand-rose" />, desc: 'Flawless, traditional, high-definition makeup for your big day.', price: 35000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgwnRLqIZtGXRCT1cUjx9psf437ADj8-0breZUMbHyA_ADe4_hRe2bnuvL3jpwaQ-YYiTziOKNBuyXsKyUhG8oWQvC24pVTcrsEJGs91dZ24hnDtz66vvhiIu41geWCqxbfl3Y7E4fRTuFB2tH4ztujT-7N0gjZe8HPP8JLSlKDcFUMeNoCejTW2h4KiesaXgsa3N4KbVGeJ5oe4Wgk6riBf0iqbcVYuSY9_o2li8hvKuMB_oDsXD' },
      { id: 'hc-styling', name: 'Hair Styling', icon: <Scissors className="text-brand-rose" />, desc: 'Modern haircuts, locks, volume blows, and traditional floral updos.', price: 2000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCro6Xj1LX84Vcf4g-BcOqUyczB9mZZplUTufVMzBDlQd5Hkay_rukIDkbFCVXhUvpO8Eik6yv1gimKuwtB8NeOZR3tD77cgl3hpXh7R113G91ZleyL3d8nDWtCiMs5TSwSxI3WOIJbclGuMO91dgGomEMy1TTvjl9_ToeC4938ijtSv-Sr0lPZhAVWg53COUa2ubRi82maav-F3S4W9YqesmSewuaz3xZCLRL69_FCFILtWH8p1Uzb' },
      { id: 'fc-janssen', name: 'Facials & Glow', icon: <Smile className="text-brand-rose" />, desc: 'Janssen whitening treatments and oxygen therapies for luminous skin.', price: 3500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfoeYM6Gent_4d4-tHzpJEW0UU3uQpIdc6si_L2AiNxaYfrgyXgDOsUhfTdqWR8LUuaZ-Gx7BatjR61clTydN8q_eeq3LLEhnJuigqEoba1rwJrtPVfOsJY5Yfd4Uxo0xHoYFB133iaAQJmIttiGYw8gWc7EP8GGRmnqB_zjx1_hSd9pH9obCf8W_Fo2mOrY69LAE-tIwXtD7DXCJ41S0MI8USCz9AbIzY1aQcH4GBZEx9Hp9DYpLZ' },
      { id: 'mp-nailart', name: 'Nail Artistry', icon: <Sparkles className="text-brand-rose" />, desc: 'High-shine gel manicures and hand-painted metallic gold acrylic accents.', price: 1500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApn62OLuxfKkjha9V8gJPwByB0NVzzhnRCVL00TW4xOxIje2y7Jjt52vC07Qip62U_ldMoR1Hr2SqAOOwIDH9a_lpBmtAgAgwcjLtsU-W-jRkZkhpWskgeMJC1jMJPAqv_InO3Z07ruOOkFeSt0UmckLLsBMcBZhuLPentbJfqnHEb0Pfc4IfDUZ-8rcLiLvGAZGi4Qvb3YPFSHQCANfkbrs9UyH284kFAeN9IbGmeUoi48aUrZEQa' }
    ];

    return (
      <div className="space-y-20 animate-fade-in">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-white dark:bg-brand-dark transition-colors duration-300">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIgwnRLqIZtGXRCT1cUjx9psf437ADj8-0breZUMbHyA_ADe4_hRe2bnuvL3jpwaQ-YYiTziOKNBuyXsKyUhG8oWQvC24pVTcrsEJGs91dZ24hnDtz66vvhiIu41geWCqxbfl3Y7E4fRTuFB2tH4ztujT-7N0gjZe8HPP8JLSlKDcFUMeNoCejTW2h4KiesaXgsa3N4KbVGeJ5oe4Wgk6riBf0iqbcVYuSY9_o2li8hvKuMB_oDsXD"
              alt="Luxury Pakistani Bridal Look"
              className="w-full h-full object-cover object-center"
            />
            {/* Elegant luxury overlay match */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-white/95 via-brand-white/60 to-transparent dark:from-brand-dark/95 dark:via-brand-dark/60" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center">
            <div className="max-w-xl space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-rose bg-brand-rose/10 px-3.5 py-1.5 rounded-full border border-brand-rose/25 inline-block">
                💖 Professional Salon in Qamber
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark dark:text-white tracking-tight leading-tight">
                Enhancing Your Natural <span className="text-brand-rose">Beauty</span> With Care &amp; Elegance.
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-brand-dark/75 dark:text-white/75 max-w-md">
                Experience world-class traditional and contemporary beauty therapies tailored meticulously to celebrate your unique charm.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-brand-rose hover:bg-brand-rose/95 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Book Appointment
                </button>
                <a
                  href="https://wa.me/923111730351"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <MessageSquare size={16} />
                  WhatsApp Booking
                </a>
                <a
                  href="tel:03111730351"
                  className="flex items-center justify-center border-2 border-brand-rose/25 text-brand-rose hover:bg-brand-rose/5 font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition-all"
                >
                  Call: 0311-1730351
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE SERVICES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Our Selection</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Our Signature Services</h2>
            <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60 max-w-md mx-auto">Explore premium boutique treatments carefully designed to make you feel completely refreshed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureServices.map((ser, i) => (
              <div
                key={ser.id}
                className={`group bg-brand-beige/25 dark:bg-brand-dark/40 border border-brand-rose/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                  i === 0 ? 'border-brand-gold bg-brand-beige/40' : ''
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ser.img}
                    alt={ser.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {i === 0 && (
                    <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                      Signature Gold
                    </span>
                  )}
                </div>
                
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    {ser.icon}
                    <h3 className="font-serif text-base font-bold text-brand-dark dark:text-white">{ser.name}</h3>
                  </div>
                  <p className="text-xs text-brand-dark/70 dark:text-white/70 line-clamp-2 leading-relaxed h-8">
                    {ser.desc}
                  </p>
                  <div className="border-t border-brand-rose/10 pt-3 flex justify-between items-center text-xs">
                    <span className="font-bold text-brand-rose">Rs. {ser.price}</span>
                    <button
                      onClick={() => {
                        const targetSer = services.find(s => s.id === ser.id);
                        if (targetSer) {
                          // Trigger booking immediately
                          setIsBookingOpen(true);
                        }
                      }}
                      className="bg-brand-rose hover:bg-brand-rose/90 text-white font-bold uppercase tracking-wider text-[10px] px-3.5 py-2 rounded-lg transition-all cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <button
              onClick={() => setCurrentView('services')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-rose hover:underline"
            >
              Browse All Services <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* COUNTDOWN OFFERS / DEALS SECTION */}
        <section className="bg-brand-beige/35 dark:bg-brand-dark/40 border-y border-brand-rose/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Hurry Up!</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-brand-rose leading-tight">
                  Limited Time Hair Keratin &amp; Bridal Combo Packages
                </h2>
                <p className="text-sm leading-relaxed text-brand-dark/75 dark:text-white/70">
                  Prep yourself with premium L'Oréal Extenso styling, golden skin therapies, and luxurious herbal protein masks at absolute unmatched pricing.
                </p>

                {/* Grid Countdown */}
                <div className="grid grid-cols-4 gap-3 text-center max-w-sm">
                  {[
                    { val: countdownTime.days, label: 'Days' },
                    { val: countdownTime.hours, label: 'Hours' },
                    { val: countdownTime.mins, label: 'Mins' },
                    { val: countdownTime.secs, label: 'Secs' }
                  ].map((block) => (
                    <div key={block.label} className="bg-white dark:bg-brand-dark/90 p-3 rounded-2xl border border-brand-rose/20 shadow-sm">
                      <span className="block text-2xl font-black text-brand-rose">{String(block.val).padStart(2, '0')}</span>
                      <span className="block text-[9px] uppercase tracking-wider font-bold opacity-50 mt-0.5">{block.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentView('deals')}
                    className="bg-brand-rose hover:bg-brand-rose/95 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow cursor-pointer"
                  >
                    Explore Active Deals
                  </button>
                </div>
              </div>

              {/* Offer Card Mock */}
              <div className="bg-white dark:bg-brand-dark p-6 rounded-3xl border-2 border-brand-rose/25 shadow-xl space-y-4 max-w-md mx-auto relative overflow-hidden">
                <span className="absolute top-4 right-4 bg-brand-rose text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/20">
                  Best Value Promo
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-rose">Gold Pampering Pack</h3>
                <p className="text-xs text-brand-dark/60">Comprehensive pre-wedding treatment combo.</p>
                
                <div className="border-t border-brand-rose/10 pt-3 space-y-2 text-xs">
                  {['Janssen Nourishing Facials', 'Full Arms Waxing (Charcoal)', 'Classic Pedicure / Bleach', 'Eyebrow + Upper Lip Threading'].map((item) => (
                    <div key={item} className="flex gap-2 items-center">
                      <CheckCircle size={14} className="text-brand-rose" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-brand-rose/10 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-xs line-through opacity-50 block">Rs. 5,500</span>
                    <span className="text-lg font-black text-brand-rose">Rs. 3,800</span>
                  </div>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-brand-dark hover:bg-brand-dark/90 dark:bg-brand-rose text-white font-bold uppercase tracking-wider text-[10px] px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Claim Deal
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* THE SAIRA EXPERIENCE (WHY CHOOSE US) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Our Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">The Saira Experience</h2>
            <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60 max-w-md mx-auto">We combine premium imported cosmetics with highly professional hygiene standards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Experienced Staff', desc: 'Highly trained professionals certifying custom beauty needs.', icon: 'workspace_premium' },
              { title: 'Affordable Luxury', desc: 'Providing unmatched boutique standards at very accessible pricing.', icon: 'savings' },
              { title: 'Pristine Hygiene', desc: 'Strict sterilization schedules for styling combs and facial gear.', icon: 'sanitizer' },
              { title: 'Personalized Care', desc: 'Tailored cosmetic selections that complement your skin tone.', icon: 'favorite' },
              { title: 'Premium Products', desc: 'Only authentic German Janssen and L\'Oréal products used.', icon: 'star' },
              { title: 'Convenient Location', desc: 'Easily accessible premium parlor workspace located in Qamber.', icon: 'location_on' }
            ].map((item, idx) => (
              <div key={idx} className="bg-brand-white dark:bg-brand-dark p-6 rounded-2xl border border-brand-rose/10 flex flex-col items-center space-y-3 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-brand-rose/15 text-brand-rose flex items-center justify-center border border-brand-rose/20 shadow-sm">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-brand-dark dark:text-white">{item.title}</h3>
                <p className="text-xs text-brand-dark/70 dark:text-white/70 max-w-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BEFORE & AFTER PORTFOLIO HIGHLIGHTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Real Transformations</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Before &amp; After Gallery</h2>
            <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60 max-w-md mx-auto">Witness the magical touch of Saira on real brides and skincare treatments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.filter(item => item.isBeforeAfter).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedLightboxItem(item)}
                className="group relative bg-brand-beige/25 dark:bg-brand-dark/35 p-4 rounded-3xl border border-brand-rose/10 shadow-sm flex flex-col cursor-pointer hover:border-brand-rose transition-all duration-300"
              >
                <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-2xl">
                  <div className="relative h-64">
                    <span className="absolute top-3 left-3 bg-brand-dark/60 text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full z-10">Before</span>
                    <img src={item.beforeImage} alt="Before Treatment" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                  </div>
                  <div className="relative h-64">
                    <span className="absolute top-3 left-3 bg-brand-rose text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full z-10">After Saira Touch</span>
                    <img src={item.image} alt="After Treatment" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                  </div>
                </div>
                <div className="pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">{item.category}</span>
                    <h4 className="font-serif text-sm font-bold text-brand-dark dark:text-white">{item.title}</h4>
                  </div>
                  <span className="text-[10px] font-bold text-brand-rose uppercase hover:underline">Compare Fullscreen</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <button
              onClick={() => setCurrentView('gallery')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-rose hover:underline"
            >
              Browse Gallery Portfolio <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* 5-STAR TESTIMONIALS */}
        <section className="bg-brand-beige/25 dark:bg-brand-dark/40 py-16 border-y border-brand-rose/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">What They Say</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">5-Star Customer Reviews</h2>
              <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60 max-w-md mx-auto">Verified comments from brides and regular salon visitors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Sadia Magsi', rating: 5, date: '2026-07-01', text: 'Saira is an absolute artist! The airbrush bridal makeup was flawless and lasted for hours under hot lights. Outstanding service.', verified: true },
                { name: 'Fariha Balouch', rating: 5, date: '2026-07-05', text: 'Loved the Janssen facial! My skin is glowing like never before. Highly recommend Saira Beauty Parlor in Qamber.', verified: true },
                { name: 'Shazia Shah', rating: 5, date: '2026-07-08', text: 'Very hygienic and professional. Fiza is excellent with layers haircuts and blow dry styling. Affordable prices too.', verified: true }
              ].map((rev, idx) => (
                <div key={idx} className="bg-white dark:bg-brand-dark p-6 rounded-2xl border border-brand-rose/10 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold">{rev.name}</h4>
                      <p className="text-[10px] opacity-50">{rev.date}</p>
                    </div>
                    {rev.verified && (
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-brand-rose bg-brand-rose/10 px-2 py-0.5 rounded border border-brand-rose/20">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex text-brand-gold text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-brand-dark/80 dark:text-white/80 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM FEED PLACEHOLDER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Follow Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Instagram Feed Grid</h2>
            <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60">Follow <span className="font-bold text-brand-rose">@SairaBeautyParlor</span> for daily makeup guides and discounts.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuApn62OLuxfKkjha9V8gJPwByB0NVzzhnRCVL00TW4xOxIje2y7Jjt52vC07Qip62U_ldMoR1Hr2SqAOOwIDH9a_lpBmtAgAgwcjLtsU-W-jRkZkhpWskgeMJC1jMJPAqv_InO3Z07ruOOkFeSt0UmckLLsBMcBZhuLPentbJfqnHEb0Pfc4IfDUZ-8rcLiLvGAZGi4Qvb3YPFSHQCANfkbrs9UyH284kFAeN9IbGmeUoi48aUrZEQa',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCro6Xj1LX84Vcf4g-BcOqUyczB9mZZplUTufVMzBDlQd5Hkay_rukIDkbFCVXhUvpO8Eik6yv1gimKuwtB8NeOZR3tD77cgl3hpXh7R113G91ZleyL3d8nDWtCiMs5TSwSxI3WOIJbclGuMO91dgGomEMy1TTvjl9_ToeC4938ijtSv-Sr0lPZhAVWg53COUa2ubRi82maav-F3S4W9YqesmSewuaz3xZCLRL69_FCFILtWH8p1Uzb',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBfdTVFYbKSbn2ZiRQI53rR7gKQfHAQqJR6FCGi573ELG9pTl4QpKpNOoGvRf0Q17bsasLr4pKa6XRWPnXPOcaqrs3ixmWWYn6YSJXi657XKf52ifAIfdAO_DCJYwLZm7cTywlMyYv6L2h9gQPCTQ7YDB9cJV7zajYM7kAhuHeVeV7vpnust-bfFOt98kuHUlvyEASul3N2UcsDHBq4syMtvAhZ4PC7hIu2rP6uuYprXO_z3Ms3BSWw'
            ].map((feedImg, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl aspect-square border border-brand-rose/5 shadow-sm">
                <img src={feedImg} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-brand-rose/85 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <Instagram className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ Accordion) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Common Inquiries</span>
            <h2 className="font-serif text-3xl font-extrabold text-brand-rose">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {[
              { q: 'Should I book my bridal makeup package in advance?', a: 'Yes! Saira Magsi is usually booked weeks in advance. We highly recommend confirming bridal bookings 3 to 4 days prior to your Mehndi, Barat, or Valima events.' },
              { q: 'What skin care product lines do you use?', a: 'All facial skincare treatments rely exclusively on high-end imported Janssen Cosmetics (German) and Olivia/Keune formulation mixes to guarantee safe, rash-free skin glow.' },
              { q: 'Is there a booking fee / advanced payment requirement?', a: 'Online bookings are tentative pending phone confirmations. No advance deposit is mandatory for regular salon cuts or threading, but we do require a minor reservation deposit for royal bridal packages.' },
              { q: 'Do you offer home salon visits for brides?', a: 'Currently Saira Beauty Parlor services are executed in-house at our Qamber Sindh studio to guarantee the highest quality lighting and pristine hygienic conditions.' }
            ].map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div key={idx} className="bg-brand-beige/15 dark:bg-brand-dark/40 rounded-2xl border border-brand-rose/10 overflow-hidden text-xs">
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-brand-rose cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-brand-dark/80 dark:text-white/85 leading-relaxed border-t border-brand-rose/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-brand-beige/45 dark:bg-brand-dark/40 border border-brand-rose/15 p-8 sm:p-12 rounded-3xl text-center space-y-6">
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-serif text-2xl font-bold text-brand-rose">Join Saira Beauty Circle</h3>
              <p className="text-xs text-brand-dark/60 dark:text-white/60">Subscribe to receive instant mobile alerts on Chand Raat mehndi deals, student cuts, and limited-time L'Oréal smoothing offers.</p>
            </div>

            {newsletterSuccess ? (
              <div className="p-3 bg-green-500/10 text-green-600 text-xs font-semibold rounded-xl max-w-sm mx-auto border border-green-500/20">
                🎉 Congratulations! You have successfully subscribed to the Saira Newsletter.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto text-xs">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/60 outline-none focus:border-brand-rose"
                />
                <button
                  type="submit"
                  className="bg-brand-rose hover:bg-brand-rose/90 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        {/* GOOGLE MAPS COMPONENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Visit Us</span>
            <h2 className="font-serif text-3xl font-extrabold text-brand-rose">Find Us on Google Map</h2>
            <p className="text-xs text-brand-dark/60 dark:text-white/60">We are conveniently located near Main Bazaar, Qamber, Sindh, Pakistan.</p>
          </div>

          <div className="h-96 rounded-3xl overflow-hidden border-2 border-brand-rose/25 shadow-lg relative bg-brand-beige">
            {/* Standard embedded Qamber map iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.0!2d68.001!3d27.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39343f87532dfc29%3A0xe5a3c11bc32db51a!2sKambar%2C%20Sajawal%20Kambar%20Deh%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Saira Beauty Parlor Location Map"
            />
          </div>
        </section>

      </div>
    );
  };

  // 2. ABOUT VIEW COMPONENT
  const AboutView = () => {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in text-xs leading-relaxed">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Meet the Founder</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-brand-rose leading-tight">
              About Saira Beauty Parlor
            </h2>
            <p className="text-sm text-brand-dark/80 dark:text-white/80">
              Founded and directed by senior beautician <span className="font-semibold text-brand-rose">Saira Magsi</span>, Saira Beauty Parlor has been the premiere bridal destination in Qamber, Sindh, Pakistan.
            </p>
            <p className="text-brand-dark/70 dark:text-white/70">
              Our mission is strictly literal: "Enhancing Your Natural Beauty with Care &amp; Elegance." We reject heavy cakey cosmetic masks, preferring high-precision skin matches and radiant natural highlights using imported German Janssen formulations.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
              alt="Saira Magsi, founder of Saira Beauty Parlor"
              className="rounded-3xl border-2 border-brand-rose/25 shadow-xl w-full h-[350px] object-cover"
            />
          </div>
        </div>

        {/* Key Features Icons block */}
        <div className="bg-brand-beige/35 dark:bg-brand-dark/40 border border-brand-rose/10 p-8 rounded-3xl space-y-8">
          <h3 className="font-serif text-xl font-bold text-brand-rose text-center">Our Five Core Standards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {[
              { title: 'Experienced Stylists', desc: 'All artists hold senior cosmetic certifications with years of professional bridal updo expertise.' },
              { title: 'Affordable Pricing', desc: 'Unmatched luxury care that stays perfectly within reach for local families & students.' },
              { title: 'Clean Environment', desc: 'Strict daily sanitation protocols for premium hygiene comfort.' },
              { title: 'Premium Products', desc: 'Exclusively imported Keune, L\'Oréal, Janssen and O3+ cosmetics.' },
              { title: 'Customer Satisfaction', desc: 'Striving for 5-star verified ratings with custom-tailored cosmetic consultation.' }
            ].map((p, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-brand-dark/90 rounded-2xl border border-brand-rose/5 space-y-2">
                <span className="text-brand-rose font-bold text-sm block">✨ {p.title}</span>
                <p className="text-brand-dark/70 dark:text-white/70 text-[11px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  // 3. SERVICES VIEW COMPONENT
  const ServicesView = () => {
    const [selectedCat, setSelectedCat] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = services.filter((s) => {
      const matchesCat = selectedCat === 'all' || s.category === selectedCat;
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in text-xs">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Indulge Yourself</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Premium Treatment Cards</h2>
          <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60 max-w-md mx-auto">Explore our premium categorized cosmetic treatments and select your perfect beauty upgrade.</p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-brand-beige/20 dark:bg-brand-dark/40 p-4 rounded-3xl border border-brand-rose/10">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 text-brand-rose" size={16} />
            <input
              type="text"
              placeholder="Search treatments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/60 text-xs outline-none focus:border-brand-rose"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap cursor-pointer ${
                selectedCat === 'all'
                  ? 'bg-brand-rose text-white shadow'
                  : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
              }`}
            >
              All Treatments
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-brand-rose text-white shadow'
                    : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-brand-dark/50 py-12 font-bold">No treatments found matching search.</p>
          ) : (
            filtered.map((ser) => (
              <div key={ser.id} className="group bg-white dark:bg-brand-dark border border-brand-rose/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={ser.image} alt={ser.name} className="w-full h-full object-cover transition-transform group-hover:scale-102" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-extrabold text-brand-gold">{ser.category}</span>
                    <span className="text-xs font-bold text-brand-rose">⏱️ {ser.duration}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-brand-dark dark:text-white leading-tight">{ser.name}</h4>
                  <p className="text-xs text-brand-dark/70 dark:text-white/70 line-clamp-2 leading-relaxed">{ser.description}</p>
                  
                  <div className="pt-3 border-t border-brand-rose/10 flex justify-between items-center">
                    <span className="text-sm font-extrabold text-brand-rose">PKR {ser.price}</span>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-brand-rose hover:bg-brand-rose/90 text-white font-bold uppercase tracking-wider text-[10px] px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      Book Button
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    );
  };

  // 4. DEALS VIEW COMPONENT
  const DealsView = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in text-xs leading-relaxed">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Super Saver Packages</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Special Discount Deals</h2>
          <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60 max-w-sm mx-auto">Luxury bridal packages and Chand Raat student specials curated with absolute elegance.</p>
        </div>

        {/* Promo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white dark:bg-brand-dark/90 p-6 rounded-3xl border-2 border-brand-rose/15 shadow-md flex flex-col justify-between relative overflow-hidden">
              {deal.badge && (
                <span className="absolute top-4 right-4 bg-brand-rose text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                  {deal.badge}
                </span>
              )}
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold block">{deal.category} Package</span>
                  <h3 className="font-serif text-lg font-bold text-brand-dark dark:text-white mt-1">{deal.title}</h3>
                  <p className="text-brand-dark/70 dark:text-white/70 text-[11px] mt-0.5">{deal.description}</p>
                </div>

                <div className="space-y-2 bg-brand-beige/25 p-4 rounded-2xl border border-brand-rose/5">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-brand-rose">Included Treatments:</span>
                  <ul className="space-y-1.5 text-[11px]">
                    {deal.items.map((it, i) => (
                      <li key={i} className="flex gap-2 items-center">
                        <CheckCircle size={12} className="text-brand-rose shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-rose/10 flex justify-between items-center mt-6">
                <div>
                  <span className="text-xs line-through opacity-50 block">Rs. {deal.originalPrice}</span>
                  <span className="text-lg font-black text-brand-rose">Rs. {deal.price}</span>
                </div>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-brand-rose hover:bg-brand-rose/90 text-white font-bold uppercase tracking-wider text-[10px] px-5 py-2.5 rounded-xl cursor-pointer shadow"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  };

  // 5. PRICE LIST VIEW COMPONENT
  const PriceListView = () => {
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchKeyword, setSearchKeyword] = useState('');

    const displayServices = services.filter((s) => {
      const matchesCat = filterCategory === 'all' || s.category === filterCategory;
      const matchesSearch = s.name.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchesCat && matchesSearch;
    });

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in text-xs">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Authentic Price Guide</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Searchable Pricing Page</h2>
          <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60">Fully transparent price schedules in Pakistani Rupees (PKR) with helpful category filters.</p>
        </div>

        {/* Filter & Search Block */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-brand-beige/20 p-4 rounded-3xl border border-brand-rose/10">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 text-brand-rose" size={16} />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white text-xs outline-none focus:border-brand-rose"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 max-w-full">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap cursor-pointer ${
                filterCategory === 'all' ? 'bg-brand-rose text-white shadow' : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
              }`}
            >
              All List
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap cursor-pointer ${
                  filterCategory === cat.id ? 'bg-brand-rose text-white shadow' : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Pricing Table */}
        <div className="overflow-x-auto rounded-3xl border border-brand-rose/15 shadow bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-brand-beige/50 border-b border-brand-rose/15 font-bold uppercase text-[10px] text-brand-dark/60">
                <th className="p-4 pl-6">Treatment Name</th>
                <th className="p-4">Est. Duration</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right pr-6">Cost (PKR)</th>
                <th className="p-4 text-center">Schedule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-rose/5">
              {displayServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-dark/50 font-semibold">
                    No results found.
                  </td>
                </tr>
              ) : (
                displayServices.map((ser) => (
                  <tr key={ser.id} className="hover:bg-brand-rose/5 transition-colors">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-brand-dark">{ser.name}</p>
                      <p className="text-[10px] text-brand-dark/50">{ser.description}</p>
                    </td>
                    <td className="p-4 font-semibold text-brand-dark/60">{ser.duration}</td>
                    <td className="p-4 font-bold text-brand-gold uppercase text-[10px]">{ser.category}</td>
                    <td className="p-4 text-right pr-6 font-extrabold text-brand-rose">Rs. {ser.price}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setIsBookingOpen(true)}
                        className="bg-brand-rose/10 text-brand-rose hover:bg-brand-rose hover:text-white font-bold uppercase text-[9px] px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    );
  };

  // 6. GALLERY VIEW COMPONENT
  const GalleryView = () => {
    const [galCat, setGalCat] = useState('all');

    const filteredGal = galleryItems.filter((g) => {
      return galCat === 'all' || g.category === galCat;
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in text-xs leading-relaxed">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Real Work Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Cosmetic Transformations</h2>
          <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60">Inspect detailed before-after comparisons, bridal updo sessions, and premium nail art designs.</p>
        </div>

        {/* Categories pill bar */}
        <div className="flex gap-2 overflow-x-auto justify-center pb-2">
          {['all', 'bridal', 'hair', 'facial', 'nail', 'henna', 'interior', 'video'].map((cat) => (
            <button
              key={cat}
              onClick={() => setGalCat(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer whitespace-nowrap ${
                galCat === cat ? 'bg-brand-rose text-white shadow' : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGal.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedLightboxItem(item)}
              className="group relative bg-brand-white dark:bg-brand-dark border border-brand-rose/10 rounded-2xl overflow-hidden shadow-sm aspect-square cursor-pointer hover:border-brand-rose transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-brand-rose/85 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-all">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold">{item.category}</span>
                <h4 className="font-serif text-sm font-bold text-white mt-1 truncate">{item.title}</h4>
                <span className="text-[10px] font-bold text-white uppercase hover:underline mt-2 inline-block">
                  {item.isVideo ? '▶ Play Video' : item.isBeforeAfter ? 'Compare Photos' : 'View Fullscreen'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  };

  // 7. CONTACT VIEW COMPONENT
  const ContactView = () => {
    const [contactSuccess, setContactSuccess] = useState(false);
    const handleContactSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setContactSuccess(true);
      setTimeout(() => setContactSuccess(false), 5000);
    };

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in text-xs leading-relaxed">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Find Us Easily</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-rose">Get In Touch With Saira</h2>
          <p className="text-xs sm:text-sm text-brand-dark/60 dark:text-white/60">Displaying public business hours, address, and helpful contact channels.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Info Side */}
          <div className="space-y-8 bg-brand-beige/25 p-6 sm:p-10 rounded-3xl border border-brand-rose/15 shadow-sm">
            <div className="space-y-2">
              <span className="font-serif text-3xl font-extrabold text-brand-rose block">Saira Beauty Parlor</span>
              <p className="text-[11px] uppercase tracking-widest text-brand-gold font-bold">Near Main Bazaar, Qamber Sindh</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <MapPin size={20} className="text-brand-rose shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-rose text-sm">Salon Location</h4>
                  <p className="text-brand-dark/75">Near Main Bazaar, Qamber, Sindh, Pakistan</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone size={20} className="text-brand-rose shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-rose text-sm">Call / WhatsApp Booking Helpline</h4>
                  <a href="tel:03111730351" className="text-brand-dark hover:text-brand-rose font-semibold transition-colors block text-base mt-1">
                    0311-1730351
                  </a>
                  <p className="text-brand-dark/50 text-[10px]">(Online daily 10:00 AM – 9:00 PM)</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Clock size={20} className="text-brand-rose shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-rose text-sm">Working Timings</h4>
                  <p className="text-brand-dark/75">Monday – Sunday (Open 7 Days a week)</p>
                  <p className="text-brand-rose font-bold text-sm mt-1">10:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <a
                href="https://wa.me/923111730351"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-md"
              >
                <MessageSquare size={16} />
                WhatsApp Live Help
              </a>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-rose/10 shadow-md">
            <h3 className="font-serif text-xl font-bold text-brand-rose mb-6">Send A Digital Message</h3>
            
            {contactSuccess ? (
              <div className="p-4 bg-green-500/10 text-green-600 font-semibold rounded-2xl border border-green-500/20 text-center">
                🎉 Thank you! Your message has been sent successfully. Saira or her assistants will call you back shortly.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Ali"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white text-sm outline-none focus:border-brand-rose"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300-1234567"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white text-sm outline-none focus:border-brand-rose"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Subject Preference</label>
                  <input
                    type="text"
                    placeholder="e.g. Bridal packages details query"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white text-sm outline-none focus:border-brand-rose"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Message Body *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please mention your dates, custom makeup styles, or specific beauty inquiries..."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white text-sm outline-none focus:border-brand-rose resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-rose hover:bg-brand-rose/90 text-white font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md text-xs"
                >
                  Submit Message
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded Google Maps locator iframe */}
        <div className="h-96 rounded-3xl overflow-hidden border border-brand-rose/15 shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.0!2d68.001!3d27.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39343f87532dfc29%3A0xe5a3c11bc32db51a!2sKambar%2C%20Sajawal%20Kambar%20Deh%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Saira Beauty Parlor Contact Locator Map"
          />
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-dark text-brand-dark dark:text-white flex flex-col font-sans transition-colors duration-300 relative">
      
      {/* Sticky Top Header Navigation */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenBooking={() => setIsBookingOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Interactive Screen Router */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'services' && <ServicesView />}
        {currentView === 'deals' && <DealsView />}
        {currentView === 'gallery' && <GalleryView />}
        {currentView === 'price-list' && <PriceListView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'customer' && (
          <CustomerDashboard
            appointments={appointments}
            currentUser={currentUser}
            onLogin={setCurrentUser}
            onLogout={handleLogout}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'admin' && (
          <AdminDashboard
            appointments={appointments}
            onUpdateAppointments={setAppointments}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'staff-panel' && (
          <StaffDashboard
            appointments={appointments}
            currentUser={currentUser}
            onLogout={handleLogout}
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={setCurrentView} />

      {/* Sticky bottom CTA for mobiles */}
      <div className="fixed bottom-0 left-0 w-full lg:hidden bg-brand-white dark:bg-brand-dark border-t border-brand-rose/10 py-3.5 px-4 flex gap-3 z-40 shadow-2xl transition-colors duration-300">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 bg-brand-rose text-white font-bold uppercase tracking-wider text-xs py-3 rounded-xl shadow-md text-center cursor-pointer"
        >
          Book Appointment
        </button>
        <a
          href="https://wa.me/923111730351"
          target="_blank"
          rel="noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-xl flex items-center justify-center shadow-md shrink-0"
        >
          <MessageSquare size={18} />
        </a>
      </div>

      {/* Floating Green WhatsApp CTA for Desktop */}
      <a
        href="https://wa.me/923111730351"
        target="_blank"
        rel="noreferrer"
        className="hidden lg:flex fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] text-white rounded-full items-center justify-center shadow-lg hover:scale-105 transition-all z-50 hover:shadow-xl"
        title="WhatsApp Live Help Helpline"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>

      {/* LIGHTBOX OVERLAY */}
      {selectedLightboxItem && (
        <Lightbox
          item={selectedLightboxItem}
          items={galleryItems}
          onClose={() => setSelectedLightboxItem(null)}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}

      {/* BOOKING OVERLAY MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingForm
            onClose={() => setIsBookingOpen(false)}
            onBookingSuccess={handleBookingSuccess}
            currentUser={currentUser}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
