import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext
}: LightboxProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-md transition-opacity duration-300">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-250 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation - Prev */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 z-50 p-4 rounded-full bg-white/5 text-white hover:bg-white/15 hover:scale-105 transition-all duration-250 cursor-pointer"
        aria-label="Previous Image"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl px-4 flex flex-col items-center justify-center">
        
        {/* Render Video or Image or BeforeAfter */}
        {item.isVideo ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video
              src={item.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        ) : item.isBeforeAfter && item.beforeImage ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="relative group">
              <span className="absolute top-4 left-4 bg-black/60 text-white text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10">
                Before
              </span>
              <img
                src={item.beforeImage}
                alt={`${item.title} - Before`}
                className="w-full h-[350px] md:h-[500px] object-cover rounded-2xl border border-white/10 shadow-lg"
              />
            </div>
            <div className="relative group">
              <span className="absolute top-4 left-4 bg-brand-rose text-white text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10">
                After Saira Touch
              </span>
              <img
                src={item.image}
                alt={`${item.title} - After`}
                className="w-full h-[350px] md:h-[500px] object-cover rounded-2xl border border-white/10 shadow-lg"
              />
            </div>
          </div>
        ) : (
          <div className="relative max-h-[80vh] flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/5"
            />
          </div>
        )}

        {/* Caption */}
        <div className="mt-6 text-center text-white/90">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold px-3 py-1 rounded-full bg-brand-rose/20 border border-brand-rose/20 mb-2 inline-block">
            {item.category}
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-semibold tracking-wide">
            {item.title}
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Photo {items.indexOf(item) + 1} of {items.length}
          </p>
        </div>

      </div>

      {/* Navigation - Next */}
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 z-50 p-4 rounded-full bg-white/5 text-white hover:bg-white/15 hover:scale-105 transition-all duration-250 cursor-pointer"
        aria-label="Next Image"
      >
        <ChevronRight size={28} />
      </button>

    </div>
  );
}
