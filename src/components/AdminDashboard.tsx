import { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp, Users, Calendar, Scissors, Award, Star, Settings, Image as ImageIcon,
  DollarSign, Check, X, ShieldAlert, Sparkles, Filter, Edit, Search, PlusCircle, CheckCircle, BarChart3
} from 'lucide-react';
import { services, staffList } from '../data/services';
import { deals } from '../data/deals';
import { galleryItems } from '../data/gallery';
import { Appointment, Service, Deal, GalleryItem, Review } from '../types';

interface AdminDashboardProps {
  appointments: Appointment[];
  onUpdateAppointments: (apps: Appointment[]) => void;
  onNavigate: (view: string) => void;
}

export default function AdminDashboard({
  appointments,
  onUpdateAppointments,
  onNavigate
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'customers' | 'services' | 'deals' | 'gallery' | 'reviews' | 'staff' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  // Simulated Reviews State
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', customerName: 'Sadia Magsi', rating: 5, text: 'The Janssen Golden Facial was absolutely amazing! Loved Saira\'s touch and care.', date: '2026-07-01', verified: true },
    { id: '2', customerName: 'Nazia Balouch', rating: 5, text: 'Had my bridal mehndi done here and got endless compliments. Perfect intricate patterns.', date: '2026-07-04', verified: true },
    { id: '3', customerName: 'Fariha Ali', rating: 4, text: 'Great haircut and smoothing mask. Saira and her team are highly professional.', date: '2026-07-06', verified: false }
  ]);

  // Operational metrics calculations
  const totalRevenue = appointments
    .filter((a) => a.status === 'completed' || a.status === 'confirmed')
    .reduce((sum, current) => sum + current.price, 0);

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;

  // Appointment Actions
  const handleUpdateStatus = (appId: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    const updated = appointments.map((app) => {
      if (app.id === appId) {
        return { ...app, status };
      }
      return app;
    });
    onUpdateAppointments(updated);
  };

  const handleApproveReview = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, verified: true } : r));
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  // Filter appointments
  const filteredApps = appointments.filter((app) => {
    const matchesSearch = app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-dark text-brand-dark dark:text-white transition-colors duration-300">
      
      {/* Top Welcome Title Banner */}
      <div className="bg-brand-beige dark:bg-brand-dark/40 border-b border-brand-rose/10 px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-rose bg-brand-rose/10 px-3 py-1 rounded-full border border-brand-rose/25">
            🔐 Admin Headquarters
          </span>
          <h2 className="font-serif text-3xl font-black text-brand-rose mt-2">Saira Portal</h2>
          <p className="text-xs text-brand-dark/60 dark:text-white/60">Manage bookings, monitor daily revenues, edit services, and moderate reviews.</p>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="bg-brand-rose text-white hover:bg-brand-rose/90 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider self-start cursor-pointer transition-all shadow-md"
        >
          View Client Website
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT Sidebar Controls */}
          <div className="w-full lg:w-64 space-y-2 flex-shrink-0">
            <h4 className="text-[11px] uppercase tracking-widest text-brand-gold font-bold px-3 mb-4">Operations Menu</h4>
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: <BarChart3 size={16} /> },
              { id: 'appointments', label: `Appointments (${appointments.length})`, icon: <Calendar size={16} /> },
              { id: 'customers', label: 'Loyal Customers', icon: <Users size={16} /> },
              { id: 'services', label: 'Services Manager', icon: <Scissors size={16} /> },
              { id: 'deals', label: 'Promo Deals', icon: <Award size={16} /> },
              { id: 'gallery', label: 'Gallery Admin', icon: <ImageIcon size={16} /> },
              { id: 'reviews', label: 'Review Moderation', icon: <Star size={16} /> },
              { id: 'settings', label: 'Portal Settings', icon: <Settings size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-rose text-white shadow-md'
                    : 'text-brand-dark/70 hover:bg-brand-rose/10 dark:text-white/70'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* RIGHT Workspace Content Panels */}
          <div className="flex-1 bg-brand-beige/10 dark:bg-brand-dark/40 p-6 rounded-3xl border border-brand-rose/10 min-h-[500px]">
            
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-brand-dark/80 p-5 rounded-2xl border border-brand-rose/10 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-rose/15 text-brand-rose flex items-center justify-center">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-dark/50 dark:text-white/50 block">Confirmed Revenue</span>
                      <span className="text-xl font-bold text-brand-rose">PKR {totalRevenue}</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-brand-dark/80 p-5 rounded-2xl border border-brand-rose/10 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-rose/15 text-brand-rose flex items-center justify-center">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-dark/50 dark:text-white/50 block">Pending Reviews</span>
                      <span className="text-xl font-bold">{pendingCount} Waiting</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-brand-dark/80 p-5 rounded-2xl border border-brand-rose/10 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-rose/15 text-brand-rose flex items-center justify-center">
                      <Users size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-dark/50 dark:text-white/50 block">Active Bookings</span>
                      <span className="text-xl font-bold">{confirmedCount + pendingCount} Active</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-brand-dark/80 p-5 rounded-2xl border border-brand-rose/10 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-rose/15 text-brand-rose flex items-center justify-center">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-dark/50 dark:text-white/50 block">Completion Rate</span>
                      <span className="text-xl font-bold text-brand-gold">
                        {appointments.length > 0 ? Math.round((completedCount / appointments.length) * 100) : 100}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Business Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Category Performance */}
                  <div className="bg-white dark:bg-brand-dark/80 p-6 rounded-2xl border border-brand-rose/10 shadow-sm space-y-4">
                    <h4 className="font-serif text-base font-bold text-brand-rose flex items-center gap-2">
                      <TrendingUp size={18} /> Daily Booking Volume
                    </h4>
                    <p className="text-xs text-brand-dark/50 dark:text-white/50">Simulated load based on service categories in PKR:</p>
                    <div className="space-y-3 pt-2">
                      {[
                        { label: 'Bridal Makeup', value: 'PKR 65,000', percentage: '75%' },
                        { label: 'Facials & Skin Care', value: 'PKR 14,500', percentage: '45%' },
                        { label: 'Party Makeup & Curls', value: 'PKR 10,000', percentage: '30%' },
                        { label: 'Hair Treatments', value: 'PKR 25,000', percentage: '60%' }
                      ].map((item) => (
                        <div key={item.label} className="space-y-1 text-xs">
                          <div className="flex justify-between font-semibold">
                            <span>{item.label}</span>
                            <span className="text-brand-rose">{item.value}</span>
                          </div>
                          <div className="w-full bg-brand-rose/10 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-brand-rose h-full rounded-full" style={{ width: item.percentage }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Alerts */}
                  <div className="bg-white dark:bg-brand-dark/80 p-6 rounded-2xl border border-brand-rose/10 shadow-sm space-y-4">
                    <h4 className="font-serif text-base font-bold text-brand-rose flex items-center gap-2">
                      <ShieldAlert size={18} /> Operational Alerts
                    </h4>
                    <ul className="space-y-3 text-xs leading-relaxed">
                      <li className="flex items-start gap-3 bg-brand-rose/5 p-3 rounded-xl border border-brand-rose/10 text-brand-rose">
                        <span>💡</span>
                        <div>
                          <p className="font-bold">Bridal Rush Alert</p>
                          <p className="text-[11px] opacity-80">You have 3 custom bridal appointments scheduled for this weekend. Pre-order extra Janssen facials.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 bg-brand-gold/5 p-3 rounded-xl border border-brand-gold/10 text-brand-dark dark:text-white">
                        <span>🔑</span>
                        <div>
                          <p className="font-bold">Security & Sync</p>
                          <p className="text-[11px] opacity-80">Automatic cloud replication is active. Customer database synchronized perfectly.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-brand-dark/60 p-4 rounded-2xl border border-brand-rose/5">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-3 text-brand-rose" size={16} />
                    <input
                      type="text"
                      placeholder="Search Client Name / Invoice..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-xs focus:border-brand-rose outline-none"
                    />
                  </div>
                  
                  {/* Status Filters */}
                  <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
                    {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setStatusFilter(filter as any)}
                        className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer whitespace-nowrap ${
                          statusFilter === filter
                            ? 'bg-brand-rose text-white'
                            : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-brand-rose/10 bg-white dark:bg-brand-dark/80">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-beige/50 dark:bg-brand-dark/40 border-b border-brand-rose/15 font-bold uppercase text-[10px] text-brand-dark/60 dark:text-white/60">
                        <th className="p-4">Receipt ID</th>
                        <th className="p-4">Client</th>
                        <th className="p-4">Treatment</th>
                        <th className="p-4">Staff Assigned</th>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4 text-right">Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Manage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-rose/5">
                      {filteredApps.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-brand-dark/50 dark:text-white/50 font-semibold">
                            No appointments found matching filters.
                          </td>
                        </tr>
                      ) : (
                        filteredApps.map((app) => (
                          <tr key={app.id} className="hover:bg-brand-rose/5 transition-colors">
                            <td className="p-4 font-bold text-brand-rose">{app.id}</td>
                            <td className="p-4">
                              <p className="font-bold">{app.customerName}</p>
                              <p className="text-[10px] text-brand-dark/50 dark:text-white/45">{app.phone}</p>
                            </td>
                            <td className="p-4 font-semibold">{app.serviceName}</td>
                            <td className="p-4 text-brand-gold font-bold">{app.staffName.split(' ')[0]}</td>
                            <td className="p-4 font-medium">{app.date} @ {app.time}</td>
                            <td className="p-4 text-right font-extrabold text-brand-rose">Rs. {app.price}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                app.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                app.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                app.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="p-4 flex gap-1.5 justify-center">
                              {app.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'confirmed')}
                                  className="p-1.5 rounded-lg bg-green-500/15 text-green-600 hover:bg-green-500 hover:text-white cursor-pointer"
                                  title="Confirm Appointment"
                                >
                                  <Check size={14} />
                                </button>
                              )}
                              {app.status === 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'completed')}
                                  className="p-1.5 rounded-lg bg-blue-500/15 text-blue-600 hover:bg-blue-500 hover:text-white cursor-pointer"
                                  title="Mark Completed"
                                >
                                  <CheckCircle size={14} />
                                </button>
                              )}
                              {app.status !== 'cancelled' && app.status !== 'completed' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'cancelled')}
                                  className="p-1.5 rounded-lg bg-red-500/15 text-red-600 hover:bg-red-500 hover:text-white cursor-pointer"
                                  title="Cancel Appointment"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {activeTab === 'customers' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-brand-rose">Saira Customer Directory</h4>
                  <span className="text-xs bg-brand-rose/15 text-brand-rose px-3 py-1 rounded-full font-bold">Loyalty Points Active</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-brand-rose/10 bg-white dark:bg-brand-dark/80">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-beige/50 dark:bg-brand-dark/40 border-b border-brand-rose/15 font-bold uppercase text-[10px] text-brand-dark/60 dark:text-white/60">
                        <th className="p-4">Customer Name</th>
                        <th className="p-4">Phone Number</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 text-center">Invoices</th>
                        <th className="p-4 text-right">Loyalty Points</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-rose/5">
                      {[
                        { name: 'Fatima Balouch', phone: '0300-4821820', email: 'fatima@gmail.com', bookings: 4, points: 200, status: 'VIP Elite' },
                        { name: 'Ayesha Magsi', phone: '0312-1738291', email: 'ayesha.magsi@gmail.com', bookings: 2, points: 100, status: 'Active Regular' },
                        { name: 'Hira Shah', phone: '0321-7291823', email: 'hira.shah@hotmail.com', bookings: 1, points: 50, status: 'New Guest' }
                      ].map((cust, idx) => (
                        <tr key={idx} className="hover:bg-brand-rose/5">
                          <td className="p-4 font-bold">{cust.name}</td>
                          <td className="p-4 font-medium">{cust.phone}</td>
                          <td className="p-4 text-brand-dark/60 dark:text-white/60">{cust.email}</td>
                          <td className="p-4 text-center font-bold">{cust.bookings}</td>
                          <td className="p-4 text-right font-extrabold text-brand-rose">{cust.points} Pts</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                              cust.status.includes('VIP') ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-brand-rose/10 text-brand-rose'
                            }`}>
                              {cust.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-brand-rose">Services &amp; Custom Pricing</h4>
                  <button className="flex items-center gap-1 bg-brand-rose text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-rose/90">
                    <PlusCircle size={14} /> Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((ser) => (
                    <div key={ser.id} className="p-4 bg-white dark:bg-brand-dark/80 rounded-2xl border border-brand-rose/10 flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <img src={ser.image} alt={ser.name} className="w-12 h-12 object-cover rounded-xl" />
                        <div>
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">{ser.category}</span>
                          <h5 className="font-serif text-xs font-bold text-brand-dark dark:text-white leading-tight">{ser.name}</h5>
                          <p className="text-[10px] text-brand-dark/60 dark:text-white/50">{ser.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-brand-rose">Rs. {ser.price}</p>
                        <button className="text-[10px] uppercase font-bold text-brand-dark/45 dark:text-white/50 hover:text-brand-rose flex items-center gap-1 mt-1 justify-end ml-auto">
                          <Edit size={10} /> Edit Price
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'deals' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-brand-rose">Active Offers &amp; Custom Deals</h4>
                  <button className="flex items-center gap-1 bg-brand-rose text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-rose/90">
                    <PlusCircle size={14} /> Add New Deal
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {deals.map((deal) => (
                    <div key={deal.id} className="p-5 bg-white dark:bg-brand-dark/80 rounded-2xl border border-brand-rose/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-brand-rose text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
                            {deal.category}
                          </span>
                          {deal.badge && (
                            <span className="bg-brand-gold/20 text-brand-dark dark:text-white text-[9px] font-bold px-2 py-0.5 rounded">
                              {deal.badge}
                            </span>
                          )}
                        </div>
                        <h5 className="font-serif text-sm font-bold mt-1.5 text-brand-dark dark:text-white">{deal.title}</h5>
                        <p className="text-xs text-brand-dark/60 dark:text-white/50 line-clamp-1 mt-0.5">{deal.description}</p>
                      </div>
                      <div className="text-right self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                        <div>
                          <span className="text-xs line-through opacity-45 mr-2">Rs. {deal.originalPrice}</span>
                          <span className="text-sm font-black text-brand-rose">Rs. {deal.price}</span>
                        </div>
                        <button className="text-[10px] uppercase font-bold text-brand-rose hover:underline mt-1">
                          Manage Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-brand-rose">Portfolio Admin Panel</h4>
                  <button className="flex items-center gap-1 bg-brand-rose text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-rose/90">
                    <PlusCircle size={14} /> Add Photos
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="group relative bg-white dark:bg-brand-dark rounded-xl overflow-hidden border border-brand-rose/10 shadow-sm aspect-square">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3 transition-opacity">
                        <span className="text-[9px] font-bold uppercase text-brand-gold">{item.category}</span>
                        <h6 className="text-[10px] font-semibold text-white truncate">{item.title}</h6>
                        <button className="text-[9px] font-bold text-red-400 hover:text-red-500 uppercase mt-2 text-left">
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="font-serif text-lg font-bold text-brand-rose">Customer Reviews Moderation</h4>
                
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-white dark:bg-brand-dark/80 rounded-2xl border border-brand-rose/10 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{rev.customerName}</span>
                          <span className="text-[10px] text-brand-dark/50 dark:text-white/40">{rev.date}</span>
                          {rev.verified && (
                            <span className="text-[9px] uppercase font-extrabold tracking-widest text-brand-rose bg-brand-rose/10 px-2 py-0.5 rounded border border-brand-rose/20">
                              Verified Stay
                            </span>
                          )}
                        </div>
                        <div className="flex text-brand-gold text-xs">
                          {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} size={12} className="fill-brand-gold" />)}
                        </div>
                        <p className="text-xs text-brand-dark/85 dark:text-white/85 leading-relaxed italic">"{rev.text}"</p>
                      </div>
                      
                      <div className="flex gap-2 items-center self-end sm:self-center">
                        {!rev.verified && (
                          <button
                            onClick={() => handleApproveReview(rev.id)}
                            className="bg-brand-rose text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg hover:bg-brand-rose/90 cursor-pointer"
                          >
                            Verify &amp; Feature
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="border border-brand-rose/25 text-brand-rose hover:bg-brand-rose/5 text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="font-serif text-lg font-bold text-brand-rose">Saira Portal Configuration</h4>
                
                <div className="bg-white dark:bg-brand-dark/80 p-6 rounded-2xl border border-brand-rose/10 space-y-6 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-bold block">Salon Physical Address (Public)</label>
                      <input
                        type="text"
                        defaultValue="Near Main Bazaar, Qamber, Sindh, Pakistan"
                        className="w-full px-3 py-2 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold block">Public Phone &amp; WhatsApp Helpline</label>
                      <input
                        type="text"
                        defaultValue="0311-1730351"
                        className="w-full px-3 py-2 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-brand-rose/5">
                    <h5 className="font-bold text-brand-rose uppercase tracking-wider text-[11px]">System Feature Toggles</h5>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Allow Customer Bookings Online</p>
                          <p className="text-[10px] opacity-60">Let visitors schedule slots automatically from the homepage widget.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="accent-brand-rose w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Instant SMS &amp; WhatsApp Alerts</p>
                          <p className="text-[10px] opacity-60">Automatically dispatch a structured receipt to clients upon checkout.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="accent-brand-rose w-4 h-4" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Saira Loyalty Program (Pts Engine)</p>
                          <p className="text-[10px] opacity-60">Reward 50 points per invoice to encourage client retention.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="accent-brand-rose w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="bg-brand-rose text-white font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl text-xs hover:bg-brand-rose/90">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
