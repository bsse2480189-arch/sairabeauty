import { Deal } from '../types';

export const deals: Deal[] = [
  {
    id: 'dl-bridal-deluxe',
    title: 'Royal Bridal Package (3-Days)',
    category: 'bridal',
    description: 'The ultimate luxury bridal makeover package spread over Mehndi, Barat, and Valima with comprehensive pre-wedding services.',
    price: 65000,
    originalPrice: 85000,
    badge: 'Save 20,000 PKR',
    items: [
      'Day 1: Barat Bridal Makeup & Hair Styling',
      'Day 2: Valima Airbrush Makeup',
      'Day 3: Mehndi Glam Makeup',
      'Pre-Wedding Janssen Gold Facial & Whitening Bleach',
      'Full Bridal Mehndi Designs (Hands & Feet)',
      'O3+ Luxurious Manicure & Pedicure',
      'Full Body Honey & Charcoal Waxing'
    ],
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days from now
  },
  {
    id: 'dl-wedding-party',
    title: 'Sister of the Bride / Groom Special',
    category: 'wedding',
    description: 'Perfect for sisters and close family members to shine side-by-side with elegance.',
    price: 12000,
    originalPrice: 16000,
    badge: 'Family Special',
    items: [
      '2x Signature Party Makeup',
      '2x Deluxe Hair Cut / Modern Styling',
      'Eyebrow & Upper Lip Threading (Free)',
      'High Gloss Nail Polish'
    ],
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'dl-eid-special',
    title: 'Chand Raat & Eid Glam Offer',
    category: 'eid',
    description: 'Get fully prepped for Eid holidays with our ultimate beauty combo.',
    price: 4500,
    originalPrice: 6500,
    badge: 'Eid Special',
    items: [
      'Deep Cleansing Glow Facial',
      'Chand Raat Mehndi Designs (Both Hands)',
      'Classic Pedicure or Whitening Bleach',
      'Eyebrow + Upper Lip Threading'
    ],
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'dl-student-glow',
    title: 'Collage & University Student Discount',
    category: 'student',
    description: 'Fresh and radiant look designed for younger skin. (Must show a valid student ID card).',
    price: 2000,
    originalPrice: 3500,
    badge: '42% Off Students',
    items: [
      'Herbal Facial / Skin Cleanup',
      'Trim Hair Cut + Blow Dry',
      'Eyebrow Threading'
    ]
  },
  {
    id: 'dl-birthday-babe',
    title: 'Birthday Queen Treat',
    category: 'birthday',
    description: 'Celebrate your special day with pampering fits for a queen.',
    price: 5000,
    originalPrice: 7500,
    badge: 'Birthday Gift',
    items: [
      'Herbal Glow Facial',
      'Relaxing Swedish Neck & Shoulder Massage',
      'Mani & Pedi combo',
      'Blow Dry or Hair Curls styling'
    ]
  },
  {
    id: 'dl-monthly-gold',
    title: 'Saira Monthly Glow Subscription',
    category: 'monthly',
    description: 'Your monthly maintenance routine made super affordable.',
    price: 3800,
    originalPrice: 5500,
    badge: 'Best Seller',
    items: [
      'Janssen Nourishing Cleanup',
      'Full Arms & Underarms Honey Wax',
      'Classic Pedicure',
      'Eyebrow & Upper Lip Threading'
    ]
  },
  {
    id: 'dl-limited-keratin',
    title: 'Premium Keratin & Hair Styling Combo',
    category: 'limited',
    description: 'Intense hair repair and smoothing treatment bundled with a stylish hair cut.',
    price: 9900,
    originalPrice: 15000,
    badge: 'Limited Time',
    items: [
      'L\'Oréal Extenso or Keratin Treatment',
      'High-fashion Layers Hair Cut',
      'Nutrient Scalp Spa Treatment',
      'Post-Wash Keratin Styling Advice'
    ],
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
  }
];
