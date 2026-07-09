export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: number; // in PKR
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Deal {
  id: string;
  title: string;
  category: 'bridal' | 'wedding' | 'eid' | 'student' | 'birthday' | 'monthly' | 'limited';
  description: string;
  price: number;
  originalPrice: number;
  badge?: string;
  items: string[];
  expiresAt?: string; // ISO string for countdown
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  serviceId: string;
  serviceName: string;
  price: number;
  staffName: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  dateCreated: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bridal' | 'hair' | 'facial' | 'nail' | 'henna' | 'interior' | 'video';
  image: string;
  isVideo?: boolean;
  videoUrl?: string;
  isBeforeAfter?: boolean;
  beforeImage?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  role: 'admin' | 'customer' | 'staff';
  loyaltyPoints: number;
  wishlist: string[]; // serviceIds
  bookingIds: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  availableDays: string[]; // e.g. ["Monday", "Tuesday", ...]
  availableHours: string[]; // e.g. ["10:00 AM", ...]
}
