import { MegaMenuConfig } from '@/types/layout';
import { ROUTES } from '@/constants/routes';

export const HOME_FURNITURE_MEGA_MENU: MegaMenuConfig = {
  categories: [
    {
      id: 'living-room',
      label: 'Living Room',
      href: `${ROUTES.SHOP}?category=living-room`,
      items: [
        { id: 'sofas', label: 'Sofas & Sectionals', href: `${ROUTES.SHOP}?category=sofas` },
        { id: 'coffee', label: 'Coffee Tables', href: `${ROUTES.SHOP}?category=coffee-tables` },
        { id: 'loungers', label: 'Lounge Chairs', href: `${ROUTES.SHOP}?category=lounge-chairs` },
        { id: 'tv-units', label: 'TV Consoles', href: `${ROUTES.SHOP}?category=tv-units` },
      ],
    },
    {
      id: 'bedroom',
      label: 'Master Bedroom',
      href: `${ROUTES.SHOP}?category=bedroom`,
      items: [
        { id: 'beds', label: 'Solid Timber Beds', href: `${ROUTES.SHOP}?category=beds` },
        { id: 'wardrobes', label: 'Wardrobes & Vanities', href: `${ROUTES.SHOP}?category=wardrobes` },
        { id: 'nightstands', label: 'Nightstands', href: `${ROUTES.SHOP}?category=nightstands` },
        { id: 'chest-drawers', label: 'Chest of Drawers', href: `${ROUTES.SHOP}?category=chest-drawers` },
      ],
    },
    {
      id: 'dining-room',
      label: 'Dining & Kitchen',
      href: `${ROUTES.SHOP}?category=dining`,
      items: [
        { id: 'dining-tables', label: 'Dining Tables', href: `${ROUTES.SHOP}?category=dining-tables` },
        { id: 'dining-chairs', label: 'Dining Chairs', href: `${ROUTES.SHOP}?category=dining-chairs` },
        { id: 'sideboards', label: 'Sideboards', href: `${ROUTES.SHOP}?category=sideboards` },
      ],
    },
  ],
  featured: {
    title: 'Heritage Teak Series',
    description: 'Handcrafted seasoned solid Burma teakwood engineered for modern luxury homes.',
    image: '/images/collections/walnut.jpg',
    href: `${ROUTES.SHOP}?collection=heritage-teak`,
    ctaText: 'Explore Collection',
  },
  bottomLinks: [
    { label: 'Custom Dimensions Support', href: ROUTES.CONTACT },
    { label: '100% Seasoned Wood Guarantee', href: ROUTES.ABOUT },
    { label: 'Free Interior Consultation', href: ROUTES.CONTACT },
  ],
};

export const EDUCATION_FURNITURE_MEGA_MENU: MegaMenuConfig = {
  categories: [
    {
      id: 'classroom',
      label: 'Classroom & Academy',
      href: `${ROUTES.SHOP}?category=classroom`,
      items: [
        { id: 'student-desks', label: 'Study Desks & Benches', href: `${ROUTES.SHOP}?category=student-desks` },
        { id: 'lecture-chairs', label: 'Lecture Hall Chairs', href: `${ROUTES.SHOP}?category=lecture-chairs` },
        { id: 'teacher-table', label: 'Teacher Podiums', href: `${ROUTES.SHOP}?category=teacher-desks` },
        { id: 'whiteboards', label: 'Glass Whiteboards', href: `${ROUTES.SHOP}?category=whiteboards` },
      ],
    },
    {
      id: 'library-lab',
      label: 'Library & Laboratory',
      href: `${ROUTES.SHOP}?category=library`,
      items: [
        { id: 'library-tables', label: 'Library Reading Tables', href: `${ROUTES.SHOP}?category=library-tables` },
        { id: 'book-stacks', label: 'Double Book Shelving', href: `${ROUTES.SHOP}?category=book-stacks` },
        { id: 'lab-workbenches', label: 'Lab Workbenches', href: `${ROUTES.SHOP}?category=lab-benches` },
      ],
    },
    {
      id: 'hostel',
      label: 'Hostel & Dormitory',
      href: `${ROUTES.SHOP}?category=hostel`,
      items: [
        { id: 'bunk-beds', label: 'Timber & Steel Bunk Beds', href: `${ROUTES.SHOP}?category=bunk-beds` },
        { id: 'student-lockers', label: 'Student Lockers', href: `${ROUTES.SHOP}?category=student-lockers` },
        { id: 'dorm-study', label: 'Dormitory Study Units', href: `${ROUTES.SHOP}?category=dorm-study` },
      ],
    },
  ],
  featured: {
    title: 'Academic & Campus Range',
    description: 'Heavy-duty ergonomic furniture engineered for universities, colleges, and schools.',
    image: '/images/categories/office.jpg',
    href: `${ROUTES.SHOP}?category=education-furniture`,
    ctaText: 'View Campus Series',
  },
  bottomLinks: [
    { label: 'Bulk Institution Quotation', href: ROUTES.CONTACT },
    { label: 'Heavy Duty Certification', href: ROUTES.ABOUT },
  ],
};

export const CORPORATE_FURNITURE_MEGA_MENU: MegaMenuConfig = {
  categories: [
    {
      id: 'executive-suites',
      label: 'Executive Suites',
      href: `${ROUTES.SHOP}?category=executive-suites`,
      items: [
        { id: 'exec-desks', label: 'Executive Desks', href: `${ROUTES.SHOP}?product=walnut-desk-1` },
        { id: 'credenzas', label: 'Side Credenza Storage', href: `${ROUTES.SHOP}?category=credenzas` },
        { id: 'leather-chairs', label: 'High-Back Leather Chairs', href: `${ROUTES.SHOP}?category=leather-chairs` },
      ],
    },
    {
      id: 'workstations',
      label: 'Open Workstations',
      href: `${ROUTES.SHOP}?category=workstations`,
      items: [
        { id: 'cubicles', label: 'Modular Office Benching', href: `${ROUTES.SHOP}?category=office` },
        { id: 'task-chairs', label: 'Ergonomic Task Chairs', href: `${ROUTES.SHOP}?product=ash-chair-1` },
        { id: 'acoustic-booths', label: 'Soundproof Phone Booths', href: `${ROUTES.SHOP}?category=acoustic-booths` },
      ],
    },
    {
      id: 'boardroom',
      label: 'Conference & Meeting',
      href: `${ROUTES.SHOP}?category=boardroom`,
      items: [
        { id: 'conf-tables', label: 'Boardroom Tables', href: `${ROUTES.SHOP}?category=conf-tables` },
        { id: 'conf-chairs', label: 'Swivel Meeting Chairs', href: `${ROUTES.SHOP}?category=conf-chairs` },
        { id: 'reception-desks', label: 'Reception Counters', href: `${ROUTES.SHOP}?category=reception` },
      ],
    },
  ],
  featured: {
    title: 'Corporate Headquarters Suite',
    description: 'Commercial Grade A executive furniture tailored for modern corporate headquarters.',
    image: '/images/products/walnut-desk-2.jpg',
    href: `${ROUTES.SHOP}?category=corporate-furniture`,
    ctaText: 'Explore Corporate Range',
  },
  bottomLinks: [
    { label: 'Corporate Office Space Planning', href: ROUTES.CONTACT },
    { label: 'Commercial B2B Tender Pricing', href: ROUTES.CONTACT },
  ],
};

export const INDUSTRIAL_FURNITURE_MEGA_MENU: MegaMenuConfig = {
  categories: [
    {
      id: 'heavy-duty',
      label: 'Workshop & Industrial',
      href: `${ROUTES.SHOP}?category=heavy-duty`,
      items: [
        { id: 'workbenches', label: 'Industrial Workbenches', href: `${ROUTES.SHOP}?category=workbenches` },
        { id: 'tool-cabinets', label: 'Tool Storage Cabinets', href: `${ROUTES.SHOP}?category=tool-cabinets` },
        { id: 'work-stools', label: 'Steel Work Stools', href: `${ROUTES.SHOP}?category=work-stools` },
      ],
    },
    {
      id: 'loft-aesthetics',
      label: 'Loft Timber Aesthetics',
      href: `${ROUTES.SHOP}?category=loft-aesthetics`,
      items: [
        { id: 'reclaimed-tables', label: 'Reclaimed Timber Tables', href: `${ROUTES.SHOP}?category=reclaimed-tables` },
        { id: 'iron-shelves', label: 'Steel Pipe Bookshelves', href: `${ROUTES.SHOP}?category=iron-shelves` },
        { id: 'cast-iron-accents', label: 'Cast Iron Bar Tables', href: `${ROUTES.SHOP}?category=bar-tables` },
      ],
    },
    {
      id: 'warehouse-storage',
      label: 'Warehouse & Metal Storage',
      href: `${ROUTES.SHOP}?category=warehouse-storage`,
      items: [
        { id: 'pallet-racks', label: 'Pallet Racking Systems', href: `${ROUTES.SHOP}?category=racks` },
        { id: 'metal-lockers', label: 'Metal Staff Lockers', href: `${ROUTES.SHOP}?category=metal-lockers` },
      ],
    },
  ],
  featured: {
    title: 'Raw Steel & Timber Series',
    description: 'Industrial grade structural steel frames welded with thick solid timber tops.',
    image: '/images/products/oak-cabinet-2.jpg',
    href: `${ROUTES.SHOP}?category=industrial-furniture`,
    ctaText: 'Explore Industrial Series',
  },
  bottomLinks: [
    { label: 'Industrial Fabrication Support', href: ROUTES.CONTACT },
    { label: 'Heavy Duty Capacity Specs', href: ROUTES.FAQ },
  ],
};

// Aliases for legacy playground routes
export const SHOP_MEGA_MENU = HOME_FURNITURE_MEGA_MENU;
export const ROOMS_MEGA_MENU = CORPORATE_FURNITURE_MEGA_MENU;

export const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  'home-furniture': HOME_FURNITURE_MEGA_MENU,
  'education-furniture': EDUCATION_FURNITURE_MEGA_MENU,
  'corporate-furniture': CORPORATE_FURNITURE_MEGA_MENU,
  'industrial-furniture': INDUSTRIAL_FURNITURE_MEGA_MENU,
  shop: SHOP_MEGA_MENU,
  rooms: ROOMS_MEGA_MENU,
};
