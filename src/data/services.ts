import { Service, Category, Staff } from '../types';

export const categories: Category[] = [
  { id: 'bridal-makeup', name: 'Bridal Makeup', icon: 'diamond', description: 'Exquisite bridal makeovers with premium jewelry setting and dupatta styling.' },
  { id: 'party-makeup', name: 'Party Makeup', icon: 'sparkles', description: 'Glamorous or subtle party makeovers for weddings, engagements, and special events.' },
  { id: 'facials', name: 'Facials & Skin Care', icon: 'smile', description: 'Deep cleansing, whitening, herbal, and premium organic facial treatments for a flawless glow.' },
  { id: 'hair-treatment', name: 'Hair Treatment', icon: 'droplet', description: 'Keratin, protein, rebounding, and luxury therapy for strong, glossy hair.' },
  { id: 'hair-cut', name: 'Hair Cut & Styling', icon: 'scissors', description: 'Modern haircuts, blow-dries, curls, and traditional Pakistani bridal updos.' },
  { id: 'threading', name: 'Threading', icon: 'scissors', description: 'Precise and clean hair removal for eyebrows, upper lip, and full face.' },
  { id: 'waxing', name: 'Waxing', icon: 'flame', description: 'Hygienic and smooth wax treatments for full arms, full legs, and face.' },
  { id: 'manicure-pedicure', name: 'Mani & Pedi', icon: 'sparkles', description: 'Relaxing hand and feet care with premium scrubs, creams, and gorgeous nail colors.' },
  { id: 'body-spa', name: 'Body Spa', icon: 'spa', description: 'Relaxing massages, herbal scrubs, and rejuvenating spa treatments.' },
  { id: 'mehndi', name: 'Mehndi (Henna)', icon: 'brush', description: 'Intricate Pakistani, Arabic, and bridal henna designs.' },
  { id: 'bleach', name: 'Bleach & D-Tan', icon: 'sun', description: 'Face and body bleaching, active D-Tan whitening sessions.' }
];

export const services: Service[] = [
  // Threading
  {
    id: 'th-eyebrow',
    name: 'Eyebrow Threading',
    category: 'threading',
    description: 'Precise eyebrow shaping tailored to your facial structure.',
    duration: '10 mins',
    price: 150,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'th-upperlip',
    name: 'Upper Lip Threading',
    category: 'threading',
    description: 'Quick and clean threading for upper lips.',
    duration: '5 mins',
    price: 80,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'th-fullface',
    name: 'Full Face Threading',
    category: 'threading',
    description: 'Flawless removal of facial peach fuzz and forehead threading.',
    duration: '25 mins',
    price: 500,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'
  },

  // Facials
  {
    id: 'fc-cleansing',
    name: 'Deep Cleansing Facial',
    category: 'facials',
    description: 'Includes double cleansing, steam, blackhead removal, and soothing mask.',
    duration: '35 mins',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fc-herbal',
    name: 'Herbal Glow Facial',
    category: 'facials',
    description: 'Natural herbal scrub and fresh fruit nutrient mask for sensitive skin.',
    duration: '45 mins',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fc-janssen',
    name: 'Janssen Whitening Facial',
    category: 'facials',
    description: 'Premium German Janssen skin care products for intense glow and spot reduction.',
    duration: '60 mins',
    price: 3500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfoeYM6Gent_4d4-tHzpJEW0UU3uQpIdc6si_L2AiNxaYfrgyXgDOsUhfTdqWR8LUuaZ-Gx7BatjR61clTydN8q_eeq3LLEhnJuigqEoba1rwJrtPVfOsJY5Yfd4Uxo0xHoYFB133iaAQJmIttiGYw8gWc7EP8GGRmnqB_zjx1_hSd9pH9obCf8W_Fo2mOrY69LAE-tIwXtD7DXCJ41S0MI8USCz9AbIzY1aQcH4GBZEx9Hp9DYpLZ'
  },
  {
    id: 'fc-hydra',
    name: 'HydraFacial 3D',
    category: 'facials',
    description: 'Medical-grade hydradermabrasion device facial with serum infusion.',
    duration: '75 mins',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600'
  },

  // Waxing
  {
    id: 'wx-fullarms',
    name: 'Full Arms Waxing (Charcoal)',
    category: 'waxing',
    description: 'Painless charcoal or honey wax application for long lasting smooth arms.',
    duration: '20 mins',
    price: 600,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wx-fulllegs',
    name: 'Full Legs Waxing',
    category: 'waxing',
    description: 'Smooth honey waxing covering full legs.',
    duration: '30 mins',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wx-underarms',
    name: 'Underarms Waxing',
    category: 'waxing',
    description: 'Quick hygienic wax for sensitive underarm area.',
    duration: '10 mins',
    price: 300,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600'
  },

  // Hair Treatment
  {
    id: 'ht-keratin',
    name: 'Keratin Smoothing Treatment',
    category: 'hair-treatment',
    description: 'Eliminates frizz, restores natural shine, and straightens hair beautifully.',
    duration: '150 mins',
    price: 12000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCro6Xj1LX84Vcf4g-BcOqUyczB9mZZplUTufVMzBDlQd5Hkay_rukIDkbFCVXhUvpO8Eik6yv1gimKuwtB8NeOZR3tD77cgl3hpXh7R113G91ZleyL3d8nDWtCiMs5TSwSxI3WOIJbclGuMO91dgGomEMy1TTvjl9_ToeC4938ijtSv-Sr0lPZhAVWg53COUa2ubRi82maav-F3S4W9YqesmSewuaz3xZCLRL69_FCFILtWH8p1Uzb'
  },
  {
    id: 'ht-protein',
    name: 'Herbal Hair Protein Mask',
    category: 'hair-treatment',
    description: 'Rich moisturizing treatment that repairs dry and damaged hair.',
    duration: '45 mins',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'
  },

  // Body Spa
  {
    id: 'sp-massage',
    name: 'Swedish Body Massage',
    category: 'body-spa',
    description: 'Rejuvenating aromatherapy body massage with premium oils.',
    duration: '60 mins',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600'
  },

  // Bleach & D-Tan
  {
    id: 'bl-face',
    name: 'Face Bleach (Olivia/Keune)',
    category: 'bleach',
    description: 'Skin whitening and mild active golden bleach formulation.',
    duration: '15 mins',
    price: 400,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'bl-dtan',
    name: 'D-Tan Whitening Treatment',
    category: 'bleach',
    description: 'Removes tan instantly using organic agents and high vitamin C concentrates.',
    duration: '25 mins',
    price: 800,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600'
  },

  // Hair Cut
  {
    id: 'hc-simple',
    name: 'Layers Hair Cut',
    category: 'hair-cut',
    description: 'Modern step or layers cut by our expert senior hair designer.',
    duration: '30 mins',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'hc-styling',
    name: 'Bridal Braid & Hair Styling',
    category: 'hair-cut',
    description: 'Intricate traditional bridal updos, floral settings, or elegant Hollywood curls.',
    duration: '40 mins',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600'
  },

  // Party Makeup
  {
    id: 'mk-party',
    name: 'Signature Party Makeup',
    category: 'party-makeup',
    description: 'Glamorous night look with dynamic contouring, lash application, and eye glitter.',
    duration: '60 mins',
    price: 5000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfdTVFYbKSbn2ZiRQI53rR7gKQfHAQqJR6FCGi573ELG9pTl4QpKpNOoGvRf0Q17bsasLr4pKa6XRWPnXPOcaqrs3ixmWWYn6YSJXi657XKf52ifAIfdAO_DCJYwLZm7cTywlMyYv6L2h9gQPCTQ7YDB9cJV7zajYM7kAhuHeVeV7vpnust-bfFOt98kuHUlvyEASul3N2UcsDHBq4syMtvAhZ4PC7hIu2rP6uuYprXO_z3Ms3BSWw'
  },
  {
    id: 'mk-engagement',
    name: 'Engagement / Mehndi Makeup',
    category: 'party-makeup',
    description: 'Flawless HD base makeup with elegant vibrant eyeshadow matching your dress.',
    duration: '90 mins',
    price: 10000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfdTVFYbKSbn2ZiRQI53rR7gKQfHAQqJR6FCGi573ELG9pTl4QpKpNOoGvRf0Q17bsasLr4pKa6XRWPnXPOcaqrs3ixmWWYn6YSJXi657XKf52ifAIfdAO_DCJYwLZm7cTywlMyYv6L2h9gQPCTQ7YDB9cJV7zajYM7kAhuHeVeV7vpnust-bfFOt98kuHUlvyEASul3N2UcsDHBq4syMtvAhZ4PC7hIu2rP6uuYprXO_z3Ms3BSWw'
  },

  // Bridal Makeup
  {
    id: 'br-traditional',
    name: 'Traditional Bridal Makeup (Day 1)',
    category: 'bridal-makeup',
    description: 'Full high-end bridal glam by Saira, includes jewelry setting, dupatta pinning, and deluxe hair updo.',
    duration: '180 mins',
    price: 35000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgwnRLqIZtGXRCT1cUjx9psf437ADj8-0breZUMbHyA_ADe4_hRe2bnuvL3jpwaQ-YYiTziOKNBuyXsKyUhG8oWQvC24pVTcrsEJGs91dZ24hnDtz66vvhiIu41geWCqxbfl3Y7E4fRTuFB2tH4ztujT-7N0gjZe8HPP8JLSlKDcFUMeNoCejTW2h4KiesaXgsa3N4KbVGeJ5oe4Wgk6riBf0iqbcVYuSY9_o2li8hvKuMB_oDsXD'
  },
  {
    id: 'br-valima',
    name: 'Reception / Valima Bridal Makeup',
    category: 'bridal-makeup',
    description: 'Ethereal, glowing, and dewy modern airbrush makeup for Valima reception.',
    duration: '150 mins',
    price: 30000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgwnRLqIZtGXRCT1cUjx9psf437ADj8-0breZUMbHyA_ADe4_hRe2bnuvL3jpwaQ-YYiTziOKNBuyXsKyUhG8oWQvC24pVTcrsEJGs91dZ24hnDtz66vvhiIu41geWCqxbfl3Y7E4fRTuFB2tH4ztujT-7N0gjZe8HPP8JLSlKDcFUMeNoCejTW2h4KiesaXgsa3N4KbVGeJ5oe4Wgk6riBf0iqbcVYuSY9_o2li8hvKuMB_oDsXD'
  },

  // Manicure & Pedicure
  {
    id: 'mp-classic',
    name: 'Classic Manicure & Pedicure',
    category: 'manicure-pedicure',
    description: 'Refreshing soak, scrub, nail shaping, cuticle care, massage, and high-shine nail paint.',
    duration: '50 mins',
    price: 2500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApn62OLuxfKkjha9V8gJPwByB0NVzzhnRCVL00TW4xOxIje2y7Jjt52vC07Qip62U_ldMoR1Hr2SqAOOwIDH9a_lpBmtAgAgwcjLtsU-W-jRkZkhpWskgeMJC1jMJPAqv_InO3Z07ruOOkFeSt0UmckLLsBMcBZhuLPentbJfqnHEb0Pfc4IfDUZ-8rcLiLvGAZGi4Qvb3YPFSHQCANfkbrs9UyH284kFAeN9IbGmeUoi48aUrZEQa'
  },
  {
    id: 'mp-nailart',
    name: 'Custom Luxury Nail Art',
    category: 'manicure-pedicure',
    description: 'Incredible hand-painted designs with stones, glitter, or premium gel overlay.',
    duration: '35 mins',
    price: 1500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApn62OLuxfKkjha9V8gJPwByB0NVzzhnRCVL00TW4xOxIje2y7Jjt52vC07Qip62U_ldMoR1Hr2SqAOOwIDH9a_lpBmtAgAgwcjLtsU-W-jRkZkhpWskgeMJC1jMJPAqv_InO3Z07ruOOkFeSt0UmckLLsBMcBZhuLPentbJfqnHEb0Pfc4IfDUZ-8rcLiLvGAZGi4Qvb3YPFSHQCANfkbrs9UyH284kFAeN9IbGmeUoi48aUrZEQa'
  },

  // Mehndi
  {
    id: 'mh-hands',
    name: 'Party Mehndi (Both Hands)',
    category: 'mehndi',
    description: 'Elegant front and back Arabic or Pakistani style henna designs.',
    duration: '30 mins',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'mh-bridal',
    name: 'Full Bridal Mehndi Pack',
    category: 'mehndi',
    description: 'Heavy, dense traditional intricate designs up to elbows for hands, and custom matching feet mehndi.',
    duration: '180 mins',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=600'
  }
];

export const staffList: Staff[] = [
  {
    id: 'st-saira',
    name: 'Saira Magsi (Senior Beautician)',
    role: 'Makeup & Bridal Expert',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availableHours: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']
  },
  {
    id: 'st-fiza',
    name: 'Fiza Shah',
    role: 'Hair Styling & Keratin Stylist',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=200',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableHours: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']
  },
  {
    id: 'st-aqsa',
    name: 'Aqsa Balouch',
    role: 'Skin Therapy & Facialist',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availableHours: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM']
  },
  {
    id: 'st-mariam',
    name: 'Mariam Ali',
    role: 'Nail & Mehndi Artist',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200',
    availableDays: ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availableHours: ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM']
  }
];
