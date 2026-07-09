import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Share2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Saira Beauty Parlor',
        text: 'Enhancing Your Natural Beauty with Care & Elegance in Qamber, Sindh.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Link copied to clipboard: ' + window.location.href);
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <footer className="bg-brand-beige dark:bg-brand-dark/95 text-brand-dark dark:text-white transition-colors duration-300 border-t border-brand-rose/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="font-serif text-4xl font-extrabold tracking-wider text-brand-rose">
                SAIRA
              </span>
              <span className="font-sans text-xs ml-1 uppercase tracking-widest text-brand-gold font-bold">
                Parlor
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-brand-dark/75 dark:text-white/70 max-w-sm">
              Enhancing Your Natural Beauty with Care & Elegance. Our boutique salon in Qamber, Sindh offers world-class makeup, facials, and hair design services by expert artists.
            </p>

            <div className="flex space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-rose/10 text-brand-rose hover:bg-brand-rose hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-rose/10 text-brand-rose hover:bg-brand-rose hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Facebook size={18} />
              </a>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-xl bg-brand-rose/10 text-brand-rose hover:bg-brand-rose hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                title="Share Website"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-rose border-b border-brand-rose/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { id: 'services', label: 'Our Services' },
                { id: 'deals', label: 'Bridal & Special Deals' },
                { id: 'price-list', label: 'Browse Price List' },
                { id: 'gallery', label: 'Before & After Gallery' },
                { id: 'about', label: 'Our Experienced Staff' },
                { id: 'contact', label: 'Find Us On Map' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-brand-dark/70 dark:text-white/75 hover:text-brand-rose dark:hover:text-brand-rose transition-colors hover:translate-x-1 duration-200 inline-block text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Professional Schedule */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-rose border-b border-brand-rose/10 pb-2">
              Salon Timings
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="text-brand-rose shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-brand-dark dark:text-white">Monday - Sunday</p>
                  <p className="text-brand-dark/75 dark:text-white/70 text-xs">Open 7 days a week</p>
                  <p className="text-brand-rose font-bold text-xs mt-1">10:00 AM – 9:00 PM</p>
                </div>
              </div>
              <div className="bg-brand-rose/5 p-3 rounded-xl border border-brand-rose/10">
                <p className="text-xs text-brand-dark/70 dark:text-white/60">
                  ⚠️ <span className="font-semibold text-brand-rose">Notice:</span> We highly recommend booking 3 days in advance for bridal services.
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Maps Shortcut */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-rose border-b border-brand-rose/10 pb-2">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-rose shrink-0 mt-0.5" size={16} />
                <span className="text-brand-dark/75 dark:text-white/70 leading-relaxed">
                  Saira Beauty Parlor, Near Main Bazaar, Qamber, Sindh, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-rose shrink-0" size={16} />
                <div>
                  <a href="tel:03111730351" className="text-brand-dark dark:text-white hover:text-brand-rose font-semibold transition-colors block">
                    0311-1730351
                  </a>
                  <span className="text-brand-dark/50 dark:text-white/40 text-[11px] block">(Call & WhatsApp)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-rose shrink-0" size={16} />
                <a href="mailto:sairabeautyparlor@gmail.com" className="text-brand-dark/75 dark:text-white/70 hover:text-brand-rose transition-colors text-xs truncate">
                  sairabeautyparlor@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-brand-rose/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-dark/60 dark:text-white/50">
          <p>© 2026 Saira Beauty Parlor. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed with Elegance for the Women of Qamber.
          </p>
        </div>
      </div>
    </footer>
  );
}
