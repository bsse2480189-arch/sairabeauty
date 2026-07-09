import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, ArrowRight, ArrowLeft, Search, Check, Sparkles, MessageSquare } from 'lucide-react';
import { services, categories, staffList } from '../data/services';
import { Service, Staff, Appointment } from '../types';

interface BookingFormProps {
  onClose: () => void;
  onBookingSuccess: (appointment: Appointment) => void;
  currentUser: any;
}

export default function BookingForm({ onClose, onBookingSuccess, currentUser }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Selection States
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Client details
  const [clientName, setClientName] = useState(currentUser?.name || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [clientWhatsapp, setClientWhatsapp] = useState(currentUser?.whatsapp || '0311-1730351');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [specialNotes, setSpecialNotes] = useState('');

  // Helpers
  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getDaysInMonthList = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff);
    setStep(3);
  };

  const handleDateTimeSelect = () => {
    if (!selectedDate || !selectedTime) return;
    setStep(4);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime || !clientName || !clientPhone) return;

    const receiptId = 'SAIRA-' + Math.floor(100000 + Math.random() * 900000);
    const appointment: Appointment = {
      id: receiptId,
      customerName: clientName,
      phone: clientPhone,
      whatsapp: clientWhatsapp,
      email: clientEmail,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      staffName: selectedStaff.name,
      date: selectedDate,
      time: selectedTime,
      notes: specialNotes,
      status: 'pending',
      dateCreated: new Date().toISOString()
    };

    onBookingSuccess(appointment);
    setStep(5);
  };

  const triggerWhatsAppRedirect = (receiptId: string) => {
    const text = encodeURIComponent(
      `*Saira Beauty Parlor Appointment Confirmation*\n\n` +
      `*Receipt ID:* ${receiptId}\n` +
      `*Customer:* ${clientName}\n` +
      `*Service:* ${selectedService?.name}\n` +
      `*Beautician:* ${selectedStaff?.name}\n` +
      `*Date:* ${selectedDate}\n` +
      `*Time:* ${selectedTime}\n` +
      `*Total Cost:* PKR ${selectedService?.price}\n\n` +
      `Thank you for booking with Saira Beauty Parlor! See you soon.`
    );
    window.open(`https://wa.me/923111730351?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative bg-white dark:bg-brand-dark/95 text-brand-dark dark:text-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-brand-rose/25 max-h-[90vh] flex flex-col"
      >
        {/* Header Progress bar */}
        <div className="bg-brand-beige dark:bg-brand-dark/80 px-6 py-4 border-b border-brand-rose/10 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-brand-rose">
              {step === 5 ? 'Booking Completed!' : 'Book An Appointment'}
            </h3>
            <p className="text-xs text-brand-dark/60 dark:text-white/60">
              {step === 1 && 'Step 1: Choose Your Perfect Service'}
              {step === 2 && 'Step 2: Choose Your Senior Beautician'}
              {step === 3 && 'Step 3: Select Date & Available Hours'}
              {step === 4 && 'Step 4: Confirm Contact Details'}
              {step === 5 && 'Your invoice has been generated successfully'}
            </p>
          </div>
          {step < 5 && (
            <button
              onClick={onClose}
              className="text-brand-dark/40 dark:text-white/40 hover:text-brand-rose text-sm font-bold uppercase cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Progress Step Nodes */}
        {step < 5 && (
          <div className="bg-brand-beige/50 dark:bg-brand-dark/50 px-6 py-2 flex items-center space-x-2 border-b border-brand-rose/5 text-xs">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center space-x-1.5 flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    step >= s ? 'bg-brand-rose text-white' : 'bg-brand-rose/10 text-brand-rose'
                  }`}
                >
                  {step > s ? <Check size={10} /> : s}
                </div>
                <span className={`text-[10px] uppercase tracking-wider hidden sm:inline ${step === s ? 'font-bold text-brand-rose' : 'text-brand-dark/40 dark:text-white/45'}`}>
                  {s === 1 && 'Service'}
                  {s === 2 && 'Staff'}
                  {s === 3 && 'DateTime'}
                  {s === 4 && 'Checkout'}
                </span>
                {s < 4 && <div className="h-[1px] bg-brand-rose/20 flex-1" />}
              </div>
            ))}
          </div>
        )}

        {/* Body content scroll region */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                {/* Search & Categories */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-3 text-brand-rose" size={16} />
                    <input
                      type="text"
                      placeholder="Search treatments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                    />
                  </div>
                  
                  {/* Category Pill filter */}
                  <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 max-w-full">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap ${
                        selectedCategory === 'all'
                          ? 'bg-brand-rose text-white'
                          : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
                      }`}
                    >
                      All Services
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap ${
                          selectedCategory === cat.id
                            ? 'bg-brand-rose text-white'
                            : 'bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer hover:-translate-y-1 ${
                        selectedService?.id === service.id
                          ? 'bg-brand-rose/10 border-brand-rose shadow-md'
                          : 'bg-brand-beige/20 dark:bg-brand-dark/40 border-brand-rose/10 hover:border-brand-rose/30 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-12 h-12 object-cover rounded-xl"
                        />
                        <div>
                          <h4 className="font-serif text-sm font-bold text-brand-dark dark:text-white leading-tight">
                            {service.name}
                          </h4>
                          <p className="text-[11px] text-brand-dark/60 dark:text-white/60 line-clamp-1">
                            {service.description}
                          </p>
                          <div className="flex gap-2 mt-1 text-[10px] uppercase font-bold text-brand-rose/80">
                            <span>⏱️ {service.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right pl-2">
                        <span className="text-sm font-bold text-brand-rose block">
                          Rs. {service.price}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold">
                          Select
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand-rose hover:underline"
                  >
                    <ArrowLeft size={14} /> Back to Services
                  </button>
                  <span className="text-xs font-bold bg-brand-rose/10 text-brand-rose px-3 py-1 rounded-full">
                    Selected: {selectedService?.name}
                  </span>
                </div>

                <div className="text-center py-4">
                  <h4 className="font-serif text-lg font-bold text-brand-dark dark:text-white">
                    Select Your Expert Stylist
                  </h4>
                  <p className="text-xs text-brand-dark/60 dark:text-white/50 max-w-sm mx-auto mt-1">
                    All our beauticians are certified specialists with years of premium bridal and skin experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {staffList.map((staff) => (
                    <div
                      key={staff.id}
                      onClick={() => handleStaffSelect(staff)}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer hover:border-brand-rose ${
                        selectedStaff?.id === staff.id
                          ? 'bg-brand-rose/10 border-brand-rose shadow-md'
                          : 'bg-brand-beige/20 dark:bg-brand-dark/40 border-brand-rose/10'
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className="w-14 h-14 object-cover rounded-full border-2 border-brand-rose"
                        />
                        <div>
                          <h4 className="font-serif text-sm font-bold text-brand-dark dark:text-white">
                            {staff.name}
                          </h4>
                          <p className="text-xs text-brand-gold font-semibold">{staff.role}</p>
                          <p className="text-[11px] text-brand-dark/60 dark:text-white/60">
                            ⭐ {staff.rating.toFixed(1)} / 5 (Verified Reviews)
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-brand-rose uppercase">
                        Choose
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand-rose hover:underline"
                  >
                    <ArrowLeft size={14} /> Back to Staff
                  </button>
                  <span className="text-xs font-bold bg-brand-rose/10 text-brand-rose px-3 py-1 rounded-full">
                    Stylist: {selectedStaff?.name.split(' ')[0]}
                  </span>
                </div>

                {/* Calendar Grid Selector */}
                <div className="space-y-4">
                  <h4 className="font-serif text-base font-bold text-brand-dark dark:text-white flex items-center gap-2">
                    <Calendar size={18} className="text-brand-rose" />
                    Select Appointment Date
                  </h4>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                    {getDaysInMonthList().map((dateStr) => {
                      const dateObj = new Date(dateStr);
                      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = dateObj.getDate();
                      const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
                      const isSelected = selectedDate === dateStr;

                      return (
                        <div
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-rose text-white border-brand-rose shadow-md'
                              : 'bg-brand-beige/20 dark:bg-brand-dark/40 border-brand-rose/10 hover:border-brand-rose/40'
                          }`}
                        >
                          <p className="text-[10px] uppercase font-bold opacity-60">{dayName}</p>
                          <p className="text-lg font-extrabold leading-none my-1">{dayNum}</p>
                          <p className="text-[9px] uppercase font-bold">{monthName}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="font-serif text-base font-bold text-brand-dark dark:text-white flex items-center gap-2">
                      <Clock size={18} className="text-brand-rose" />
                      Choose an Available Time Slot
                    </h4>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <div
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2.5 rounded-xl border text-center cursor-pointer text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-brand-rose text-white border-brand-rose shadow-sm'
                                : 'bg-brand-beige/20 dark:bg-brand-dark/40 border-brand-rose/10 hover:border-brand-rose/40'
                            }`}
                          >
                            {slot}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Next Step trigger */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleDateTimeSelect}
                    disabled={!selectedDate || !selectedTime}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all ${
                      selectedDate && selectedTime
                        ? 'bg-brand-rose text-white hover:bg-brand-rose/90 cursor-pointer shadow-md'
                        : 'bg-brand-dark/10 dark:bg-white/10 text-brand-dark/40 dark:text-white/40 cursor-not-allowed'
                    }`}
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-brand-rose hover:underline cursor-pointer"
                    >
                      <ArrowLeft size={14} /> Back to Date & Time
                    </button>
                  </div>

                  <div className="bg-brand-beige/35 dark:bg-brand-dark/30 p-4 rounded-2xl border border-brand-rose/10 space-y-3">
                    <h5 className="font-serif text-sm font-bold text-brand-rose uppercase tracking-wider">
                      Selected Summary
                    </h5>
                    <div className="grid grid-cols-2 gap-y-2 text-xs">
                      <div>
                        <span className="opacity-60 block">Treatment:</span>
                        <span className="font-bold">{selectedService?.name}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block">Price (PKR):</span>
                        <span className="font-bold text-brand-rose">Rs. {selectedService?.price}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block">Stylist / Professional:</span>
                        <span className="font-bold">{selectedStaff?.name}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block">Date & Time:</span>
                        <span className="font-bold">{selectedDate} @ {selectedTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Fields */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-base font-bold text-brand-dark dark:text-white">
                      Enter Your Details
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold opacity-75 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                          placeholder="Fatima Ali"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold opacity-75 block mb-1">Mobile Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                          placeholder="e.g. 0300-1234567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold opacity-75 block mb-1">WhatsApp Number</label>
                        <input
                          type="tel"
                          value={clientWhatsapp}
                          onChange={(e) => setClientWhatsapp(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                          placeholder="e.g. 0311-1730351"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold opacity-75 block mb-1">Email Address</label>
                        <input
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none"
                          placeholder="fatima@gmail.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold opacity-75 block mb-1">Special Notes / Makeup Preferences</label>
                      <textarea
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/20 bg-white dark:bg-brand-dark/40 text-sm focus:border-brand-rose outline-none resize-none"
                        placeholder="Please mention any allergies, specific skin tones, or general styling details..."
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-rose/10 flex items-center justify-between">
                    <span className="text-[10px] text-brand-dark/50 dark:text-white/50 max-w-xs">
                      * By submitting, you agree to show up 10 minutes prior to your selected hourly slot.
                    </span>
                    <button
                      type="submit"
                      className="bg-brand-rose text-white hover:bg-brand-rose/90 px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer"
                    >
                      Confirm Booking Rs. {selectedService?.price}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-rose/15 text-brand-rose flex items-center justify-center border-2 border-brand-rose animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl font-bold text-brand-rose">
                    Congratulations, {clientName}!
                  </h4>
                  <p className="text-sm font-semibold text-brand-dark/80 dark:text-white/80">
                    Your appointment has been booked and a physical invoice has been generated.
                  </p>
                  <p className="text-xs text-brand-dark/50 dark:text-white/50">
                    A confirmation SMS/WhatsApp alert was sent to <span className="font-bold text-brand-dark dark:text-white">{clientPhone}</span>.
                  </p>
                </div>

                {/* Digital Invoice Preview */}
                <div className="max-w-md mx-auto bg-brand-beige/40 dark:bg-brand-dark/50 p-6 rounded-3xl border border-brand-rose/25 space-y-4 text-left font-mono text-xs shadow-md">
                  <div className="text-center border-b border-dashed border-brand-rose/20 pb-3">
                    <span className="font-serif text-lg font-extrabold tracking-wider text-brand-rose block">SAIRA BEAUTY PARLOR</span>
                    <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Qamber, Sindh, Pakistan</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span>Invoice ID:</span>
                      <span className="font-bold text-brand-rose">SAIRA-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-bold">{selectedDate} @ {selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beautician:</span>
                      <span className="font-bold">{selectedStaff?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service booked:</span>
                      <span className="font-bold">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Client Mobile:</span>
                      <span className="font-bold">{clientPhone}</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-brand-rose/20 pt-3 flex justify-between text-sm font-extrabold">
                    <span>Total Cost (PKR):</span>
                    <span className="text-brand-rose">Rs. {selectedService?.price}</span>
                  </div>

                  <div className="bg-brand-rose/10 p-3 rounded-xl text-center text-[10px] text-brand-rose font-semibold border border-brand-rose/10">
                    🎉 You earned +50 Saira Loyalty Points for this booking!
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <button
                    onClick={() => triggerWhatsAppRedirect('SAIRA-RECEIPT')}
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    Open WhatsApp Confirmation
                  </button>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 bg-brand-rose text-white hover:bg-brand-rose/90 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <CheckCircle size={16} />
                    Done, Close Panel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
