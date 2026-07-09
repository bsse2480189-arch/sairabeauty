import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Award, Heart, History, User, Calendar, FileText, CheckCircle, ShieldAlert, Sparkles, Key, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { services } from '../data/services';
import { Appointment, Service, UserProfile } from '../types';

interface CustomerDashboardProps {
  appointments: Appointment[];
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

export default function CustomerDashboard({
  appointments,
  currentUser,
  onLogin,
  onLogout,
  onNavigate
}: CustomerDashboardProps) {
  // Toggle forms
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Wishlist simulation
  const [wishlist, setWishlist] = useState<string[]>([
    'fc-janssen',
    'ht-keratin',
    'mp-nailart'
  ]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isLoginView) {
      // Simulate quick credential checks
      if (email === 'admin@saira.com') {
        onLogin({
          id: 'admin-1',
          name: 'Saira Magsi (Admin)',
          email: 'admin@saira.com',
          phone: '0311-1730351',
          whatsapp: '0311-1730351',
          role: 'admin',
          loyaltyPoints: 9999,
          wishlist: [],
          bookingIds: []
        });
        onNavigate('admin');
      } else if (email === 'staff@saira.com') {
        onLogin({
          id: 'staff-1',
          name: 'Fiza Shah',
          email: 'staff@saira.com',
          phone: '0312-1122334',
          whatsapp: '0312-1122334',
          role: 'staff',
          loyaltyPoints: 0,
          wishlist: [],
          bookingIds: []
        });
        onNavigate('staff-panel');
      } else {
        // Log in as normal guest
        const guestName = email.split('@')[0];
        const formattedName = guestName.charAt(0).toUpperCase() + guestName.slice(1);
        onLogin({
          id: 'cust-' + Date.now(),
          name: formattedName || 'Fatima Balouch',
          email: email || 'fatima@gmail.com',
          phone: '0300-1234567',
          whatsapp: '0300-1234567',
          role: 'customer',
          loyaltyPoints: 150,
          wishlist: wishlist,
          bookingIds: []
        });
      }
    } else {
      // Register new user
      if (!name || !email || !phone) {
        setErrorMsg('Please populate all required fields.');
        return;
      }
      onLogin({
        id: 'cust-' + Date.now(),
        name,
        email,
        phone,
        whatsapp: whatsapp || phone,
        role: 'customer',
        loyaltyPoints: 50, // Welcome gift points
        wishlist: [],
        bookingIds: []
      });
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((w) => w !== id));
  };

  const myAppointments = appointments.filter((app) => {
    if (!currentUser) return false;
    return app.customerName.toLowerCase().includes(currentUser.name.split(' ')[0].toLowerCase()) ||
           app.phone === currentUser.phone;
  });

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-white dark:bg-brand-dark px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-brand-dark/95 p-8 rounded-3xl border border-brand-rose/25 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <span className="font-serif text-3xl font-extrabold text-brand-rose">SAIRA</span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-brand-gold font-bold block">Parlor Portals</span>
            <h3 className="text-lg font-bold text-brand-dark dark:text-white pt-2">
              {isLoginView ? 'Welcome Back!' : 'Create Your Profile'}
            </h3>
            <p className="text-xs text-brand-dark/50 dark:text-white/50">
              {isLoginView ? 'Log in to view upcoming appointments & loyalty score.' : 'Register to earn 50 PKR Loyalty Points instantly.'}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs text-center font-semibold border border-red-200">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            {!isLoginView && (
              <div className="space-y-1">
                <label className="font-bold opacity-75">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Fatima Balouch"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-bold opacity-75">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. fatima@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
              />
            </div>

            {!isLoginView && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold opacity-75">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold opacity-75">WhatsApp</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="font-bold opacity-75">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-rose hover:bg-brand-rose/90 text-white font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-md mt-2 text-xs"
            >
              {isLoginView ? 'Login' : 'Complete Registration'}
            </button>
          </form>

          {/* Quick Info Credentials for testing demo ease */}
          <div className="p-3 rounded-2xl bg-brand-beige/40 dark:bg-brand-dark/50 border border-brand-rose/10 text-[10px] space-y-1.5 text-brand-dark/60 dark:text-white/50 leading-relaxed">
            <p className="font-bold text-brand-rose text-center">💡 Demo Quick Credentials</p>
            <div className="flex justify-between">
              <span>👑 Administrator:</span>
              <span className="font-bold">admin@saira.com</span>
            </div>
            <div className="flex justify-between">
              <span>✂️ Senior Stylist:</span>
              <span className="font-bold">staff@saira.com</span>
            </div>
            <p className="text-center italic mt-1">Or enter any custom email to register/login instantly.</p>
          </div>

          <div className="text-center text-xs">
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-brand-rose font-bold hover:underline"
            >
              {isLoginView ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-dark text-brand-dark dark:text-white py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Client Details */}
        <div className="bg-brand-beige dark:bg-brand-dark/40 border border-brand-rose/10 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-brand-rose/15 text-brand-rose flex items-center justify-center font-bold text-2xl border-2 border-brand-rose shadow-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">💖 Premium Client Account</span>
              <h3 className="font-serif text-2xl font-black text-brand-rose mt-1">Hello, {currentUser.name}!</h3>
              <p className="text-xs text-brand-dark/60 dark:text-white/50">{currentUser.email} | {currentUser.phone}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-white dark:bg-brand-dark/80 px-4 py-2.5 rounded-2xl border border-brand-rose/10 text-center shadow-sm">
              <span className="text-[9px] uppercase font-bold opacity-60 block leading-none mb-1">Your Loyalty Points</span>
              <span className="text-lg font-black text-brand-rose">{currentUser.loyaltyPoints} Pts</span>
            </div>
            <button
              onClick={onLogout}
              className="border border-brand-rose/25 text-brand-rose hover:bg-brand-rose/5 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider self-center cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* 3 Main Customer Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* upcoming / Booking History */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-serif text-lg font-bold text-brand-rose flex items-center gap-2">
              <History size={18} /> Booking &amp; Invoice Histories
            </h4>
            
            <div className="space-y-4">
              {myAppointments.length === 0 ? (
                <div className="p-8 text-center bg-brand-beige/10 rounded-2xl border border-brand-rose/5 text-brand-dark/50">
                  <Calendar size={32} className="mx-auto text-brand-rose/30 mb-2" />
                  <p className="font-semibold text-xs">No active bookings recorded yet.</p>
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-brand-rose text-xs font-bold hover:underline mt-2 inline-block cursor-pointer"
                  >
                    Click here to schedule your first treatment!
                  </button>
                </div>
              ) : (
                myAppointments.map((app) => (
                  <div key={app.id} className="p-5 bg-white dark:bg-brand-dark/80 rounded-2xl border border-brand-rose/10 shadow-sm space-y-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="font-bold text-brand-rose">{app.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                          app.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          app.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          app.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <h5 className="font-serif text-sm font-bold mt-1 text-brand-dark dark:text-white">{app.serviceName}</h5>
                      <p className="text-brand-dark/60 dark:text-white/60">Stylist: <span className="font-semibold">{app.staffName}</span></p>
                      <p className="text-[11px] text-brand-gold font-bold">⏱️ Appointment Date: {app.date} @ {app.time}</p>
                    </div>

                    <div className="text-right self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                      <span className="text-sm font-black text-brand-rose">PKR {app.price}</span>
                      <button className="text-[10px] uppercase font-bold text-brand-dark/45 hover:text-brand-rose flex items-center gap-1.5 mt-2">
                        <FileText size={12} /> Get Invoice
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Wishlist Sidebar */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold text-brand-rose flex items-center gap-2">
              <Heart size={18} /> Treatments Wishlist
            </h4>
            
            <div className="space-y-4">
              {wishlist.length === 0 ? (
                <p className="text-xs text-brand-dark/50 text-center py-6 bg-brand-beige/10 rounded-2xl">
                  Your wishlist is empty.
                </p>
              ) : (
                wishlist.map((id) => {
                  const serviceObj = services.find((s) => s.id === id);
                  if (!serviceObj) return null;
                  return (
                    <div key={id} className="p-4 bg-white dark:bg-brand-dark/80 rounded-2xl border border-brand-rose/10 flex justify-between items-center text-xs">
                      <div className="flex gap-3 items-center">
                        <img src={serviceObj.image} alt={serviceObj.name} className="w-10 h-10 object-cover rounded-xl" />
                        <div>
                          <h5 className="font-serif font-bold text-brand-dark dark:text-white leading-tight">{serviceObj.name}</h5>
                          <span className="text-[10px] font-bold text-brand-rose">Rs. {serviceObj.price}</span>
                        </div>
                      </div>
                      
                      <div className="text-right pl-2 space-y-1">
                        <button
                          onClick={() => handleRemoveFromWishlist(id)}
                          className="text-[9px] uppercase font-bold text-red-500 hover:underline block cursor-pointer ml-auto"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => onNavigate('home')}
                          className="bg-brand-rose text-white text-[9px] uppercase font-bold px-2 py-1 rounded-lg block cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Loyalty points discount guide banner */}
            <div className="bg-brand-rose/10 border-2 border-brand-rose/25 p-5 rounded-3xl space-y-2 text-xs">
              <h5 className="font-serif font-bold text-brand-rose flex items-center gap-1.5">
                <Award size={16} /> Points Redemption
              </h5>
              <p className="text-brand-dark/75 dark:text-white/70 leading-relaxed text-[11px]">
                Earn points with every invoice! Every <span className="font-bold text-brand-rose">100 points</span> grants you a <span className="font-bold text-brand-gold">Rs. 500 Discount</span> applicable on premium Janssen facials and bridal updos.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
