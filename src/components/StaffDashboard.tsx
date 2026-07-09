import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Activity, CheckCircle, Flame, Sun, ClipboardList } from 'lucide-react';
import { Appointment } from '../types';

interface StaffDashboardProps {
  appointments: Appointment[];
  currentUser: any;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

export default function StaffDashboard({
  appointments,
  currentUser,
  onLogout,
  onNavigate
}: StaffDashboardProps) {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState('');
  
  const handleClockToggle = () => {
    if (!isClockedIn) {
      const now = new Date();
      setClockInTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setIsClockedIn(true);
    } else {
      setIsClockedIn(false);
      setClockInTime('');
    }
  };

  // Filter appointments specifically assigned to this stylist (or mock default to Fiza Shah if unspecified)
  const staffNameFilter = currentUser?.name || 'Fiza Shah';
  const myWorkBookings = appointments.filter((app) => 
    app.staffName.toLowerCase().includes(staffNameFilter.split(' ')[0].toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-dark text-brand-dark dark:text-white py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Card & Attendance Widget */}
        <div className="bg-brand-beige dark:bg-brand-dark/40 border border-brand-rose/10 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex gap-4 items-center">
            <img
              src="https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=200"
              alt={staffNameFilter}
              className="w-16 h-16 rounded-full object-cover border-2 border-brand-rose"
            />
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">💇‍♀️ Stylist Workspace</span>
              <h3 className="font-serif text-2xl font-black text-brand-rose mt-1">Stylist: {staffNameFilter}</h3>
              <p className="text-xs text-brand-dark/60 dark:text-white/50">Senior Hair Artist &amp; Dupatta Setting Specialist</p>
            </div>
          </div>

          {/* Clock In Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="bg-white dark:bg-brand-dark/80 px-4 py-2.5 rounded-2xl border border-brand-rose/10 text-center shadow-sm w-full sm:w-auto">
              <span className="text-[9px] uppercase font-bold opacity-60 block leading-none mb-1">Attendance Today</span>
              <span className={`text-xs font-black ${isClockedIn ? 'text-green-600' : 'text-red-500'}`}>
                {isClockedIn ? `🟢 Clocked In (${clockInTime})` : '🔴 Off Duty'}
              </span>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleClockToggle}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer ${
                  isClockedIn
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isClockedIn ? 'Clock Out' : 'Clock In Now'}
              </button>
              
              <button
                onClick={onLogout}
                className="border border-brand-rose/25 text-brand-rose hover:bg-brand-rose/5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* 2 Grid split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Work Schedule List */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-serif text-lg font-bold text-brand-rose flex items-center gap-2">
              <ClipboardList size={18} /> Active Treatments Queue
            </h4>
            
            <div className="space-y-4">
              {myWorkBookings.length === 0 ? (
                <div className="p-8 text-center bg-brand-beige/10 rounded-2xl border border-brand-rose/5 text-brand-dark/50 text-xs">
                  <Calendar size={32} className="mx-auto text-brand-rose/30 mb-2" />
                  <p className="font-semibold">All clear! No pending tasks in your queue today.</p>
                </div>
              ) : (
                myWorkBookings.map((app) => (
                  <div key={app.id} className="p-5 bg-white dark:bg-brand-dark/80 rounded-2xl border border-brand-rose/10 shadow-sm space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand-rose">{app.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                        app.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        app.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-brand-rose/5 pt-3">
                      <div>
                        <span className="opacity-60 block text-[10px]">Client:</span>
                        <span className="font-bold">{app.customerName}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block text-[10px]">Treatment:</span>
                        <span className="font-bold text-brand-rose">{app.serviceName}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block text-[10px]">Date &amp; Time:</span>
                        <span className="font-bold">{app.date} @ {app.time}</span>
                      </div>
                    </div>

                    {app.notes && (
                      <div className="bg-brand-beige/25 p-3 rounded-xl text-[11px] italic">
                        "Client Note: {app.notes}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar targets and tip trackers */}
          <div className="space-y-6 text-xs">
            
            {/* Daily stats summary */}
            <div className="bg-white dark:bg-brand-dark/80 p-5 rounded-3xl border border-brand-rose/10 space-y-4">
              <h4 className="font-serif text-base font-bold text-brand-rose flex items-center gap-1.5">
                <Activity size={16} /> Daily Statistics
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b border-brand-rose/5 pb-2">
                  <span>Assigned Bookings:</span>
                  <span className="font-bold">{myWorkBookings.length} Bookings</span>
                </div>
                <div className="flex justify-between border-b border-brand-rose/5 pb-2">
                  <span>Completed Bookings:</span>
                  <span className="font-bold text-green-600">
                    {myWorkBookings.filter(b => b.status === 'completed').length} Tasks
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Daily Commission:</span>
                  <span className="font-bold text-brand-rose">
                    PKR {myWorkBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.price * 0.15), 0)} (15%)
                  </span>
                </div>
              </div>
            </div>

            {/* Safety Guidelines for work */}
            <div className="bg-brand-rose/10 border-2 border-brand-rose/25 p-5 rounded-3xl space-y-2">
              <h5 className="font-serif font-bold text-brand-rose flex items-center gap-1.5">
                <Flame size={16} /> Stylist Guidelines
              </h5>
              <p className="text-brand-dark/75 dark:text-white/70 leading-relaxed text-[11px]">
                1. Sterilize styling combs and scissors before and after every layer cut.<br/>
                2. Wear a fresh safety face mask during advanced face bleaching &amp; Janssen facials.<br/>
                3. Update task status immediately upon client departure.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
