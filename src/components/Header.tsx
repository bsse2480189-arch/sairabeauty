import { useState } from 'react';
import { Menu, X, Sun, Moon, Calendar, Phone, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenBooking: () => void;
  currentUser: any;
  onLogout: () => void;
}

export default function Header({
  currentView,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onOpenBooking,
  currentUser,
  onLogout
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'deals', label: 'Special Deals' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'price-list', label: 'Price List' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 glassmorphism dark:glassmorphism-dark border-b border-brand-rose/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="font-serif text-3xl font-extrabold tracking-wider text-brand-rose drop-shadow-sm">
              SAIRA
            </span>
            <span className="font-sans text-[10px] ml-1.5 uppercase tracking-widest text-brand-gold font-bold">
              Parlor
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-200 relative py-1 cursor-pointer ${
                  currentView === item.id
                    ? 'text-brand-rose font-bold'
                    : 'text-brand-dark/70 hover:text-brand-rose dark:text-white/70 dark:hover:text-brand-rose'
                }`}
              >
                {item.label}
                {currentView === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-rose rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full hover:bg-brand-rose/10 text-brand-rose transition-colors duration-300 cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Portal Navigation or User Status */}
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-brand-rose/10 px-3 py-1.5 rounded-full border border-brand-rose/20">
                <span className="text-xs font-semibold text-brand-rose max-w-[120px] truncate">
                  {currentUser.role === 'admin' ? '👑 Admin' : currentUser.role === 'staff' ? '✂️ Staff' : `💖 ${currentUser.name}`}
                </span>
                <button
                  onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin' : currentUser.role === 'staff' ? 'staff-panel' : 'customer')}
                  className="text-xs text-brand-gold hover:underline font-bold"
                >
                  Dashboard
                </button>
                <button onClick={onLogout} className="text-[10px] text-brand-dark/50 dark:text-white/50 hover:text-brand-rose ml-1">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('customer')}
                className="text-xs uppercase tracking-wider font-semibold text-brand-rose hover:text-brand-rose/80 hover:underline cursor-pointer"
              >
                Login / Register
              </button>
            )}

            {/* Book CTA */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-brand-rose text-white hover:bg-brand-rose/90 px-5 py-2.5 rounded-xl font-medium text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Calendar size={14} />
              Book Now
            </button>
          </div>

          {/* Mobile menu button & Theme toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full hover:bg-brand-rose/10 text-brand-rose transition-colors duration-300 cursor-pointer"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {currentUser && (
              <button
                onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin' : currentUser.role === 'staff' ? 'staff-panel' : 'customer')}
                className="p-2 text-brand-rose"
                title="Go to Dashboard"
              >
                <ShieldCheck size={20} />
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brand-rose hover:bg-brand-rose/10 transition-colors cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      {isOpen && (
        <div className="lg:hidden animate-fade-in glassmorphism dark:glassmorphism-dark border-b border-brand-rose/15">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium tracking-wide uppercase transition-colors ${
                  currentView === item.id
                    ? 'bg-brand-rose/15 text-brand-rose font-bold'
                    : 'text-brand-dark/80 hover:bg-brand-rose/5 dark:text-white/80'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-brand-rose/10 flex flex-col space-y-3 px-4">
              {!currentUser ? (
                <button
                  onClick={() => {
                    onNavigate('customer');
                    setIsOpen(false);
                  }}
                  className="text-center py-2.5 rounded-xl border border-brand-rose text-brand-rose font-semibold uppercase tracking-wider text-sm"
                >
                  Login / Register
                </button>
              ) : (
                <div className="flex flex-col space-y-1">
                  <div className="text-xs text-center text-brand-rose font-semibold bg-brand-rose/10 py-1.5 rounded-lg mb-2">
                    Logged in as: {currentUser.name}
                  </div>
                  <button
                    onClick={() => {
                      onNavigate(currentUser.role === 'admin' ? 'admin' : currentUser.role === 'staff' ? 'staff-panel' : 'customer');
                      setIsOpen(false);
                    }}
                    className="text-center py-2 bg-brand-rose/15 text-brand-rose rounded-xl font-bold uppercase tracking-wider text-xs"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  onOpenBooking();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-brand-rose text-white py-3 rounded-xl font-semibold uppercase tracking-wider text-sm shadow-md"
              >
                <Calendar size={16} />
                Book Appointment
              </button>

              <a
                href="tel:03111730351"
                className="w-full flex items-center justify-center gap-2 border border-brand-rose text-brand-rose py-3 rounded-xl font-semibold uppercase tracking-wider text-sm"
              >
                <Phone size={16} />
                Call Now: 0311-1730351
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
