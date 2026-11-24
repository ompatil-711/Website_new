// Product names come from the supplied handwritten list and the existing site.
// Descriptions are intentionally broad until specifications and prices are confirmed.
// Size/price lists below come from the owner's price list (sizes in feet, prices in Indian rupees, per board).
// Products without `options` have no confirmed price yet and stay "Price on request".
const ft = rows => rows.map(([size, price]) => ({ label: `${size.replace('x', ' × ')} ft`, price }));
const writingBoardSizes = ft([['1x1.5', 350], ['2x1.5', 450], ['2x2', 600], ['2x3', 850], ['3x4', 1200], ['4x5', 1800], ['4x6', 2500], ['4x8', 3600], ['4x10', 4700], ['4x12', 6500]]);

const catalogue = [
  { id: 'whiteboard', name: 'Whiteboard', category: 'Writing boards', tag: 'Popular', visual: 'white', summary: 'A clear writing surface for classrooms, meeting rooms and everyday planning.', uses: ['Classrooms', 'Offices'], keywords: 'white marker dry erase writing', options: writingBoardSizes },
  { id: 'greenboard', name: 'Greenboard', category: 'Writing boards', tag: 'Classroom pick', visual: 'green', summary: 'The familiar green writing board for teaching, practice and shared ideas.', uses: ['Classrooms', 'Institutions'], keywords: 'green chalk classroom writing', options: writingBoardSizes },
  { id: 'chalkboard', name: 'Chalkboard', category: 'Writing boards', visual: 'black', summary: 'A classic chalk writing surface for lessons and announcements.', uses: ['Classrooms', 'Institutions'], keywords: 'black chalk writing' },
  { id: 'pinup-notice', name: 'Pin-up Notice Board', category: 'Display boards', visual: 'pin', summary: 'Keep notices, reminders and important information in view.', uses: ['Offices', 'Institutions'], keywords: 'notice pin bulletin display' },
  { id: 'combination', name: 'Combination Board', category: 'Display boards', visual: 'combo', summary: 'Bring writing and display space together on one board.', uses: ['Classrooms', 'Offices'], keywords: 'combo writing notice pin display', options: ft([['2x1.5', 600], ['2x3', 1200], ['3x4', 1800], ['4x6', 4000], ['4x8', 5000]]) },
  { id: 'acrylic-cover', name: 'Acrylic Cover Board', category: 'Display boards', visual: 'acrylic', summary: 'A covered display format for presenting information neatly.', uses: ['Offices', 'Institutions'], keywords: 'acrylic cover display notice', options: ft([['2x1.5', 1200], ['2x3', 2400], ['3x4', 4800], ['4x6', 9600], ['4x8', 12800]]) },
  { id: 'magnetic', name: 'Magnetic Board', category: 'Specialty boards', visual: 'magnetic', summary: 'A board option for arranging notes and visual information.', uses: ['Classrooms', 'Offices'], keywords: 'magnet magnetic writing', options: ft([['2x1.5', 1500], ['2x3', 3000], ['3x4', 6000], ['4x6', 12000], ['4x8', 24000]]) },
  { id: 'ceramic', name: 'Ceramic Board', category: 'Specialty boards', visual: 'ceramic', summary: 'A ceramic board option for a clean, professional space.', uses: ['Offices', 'Institutions'], keywords: 'ceramic writing', options: ft([['3x4', 8400], ['4x6', 16800], ['4x8', 22400]]) },
  { id: 'key-board', name: 'Key Board', category: 'Specialty boards', visual: 'key', summary: 'An organised board format for keeping track of keys.', uses: ['Offices', 'Institutions'], keywords: 'key storage organisation' },
  { id: 'drawing', name: 'Drawing Board', category: 'Specialty boards', visual: 'drawing', summary: 'A dedicated surface for sketching, drafting and creative work.', uses: ['Classrooms', 'Institutions'], keywords: 'drawing sketch art draft', options: [{ label: 'Half size', price: 300 }, { label: 'Full size', price: 600 }] },
  { id: 'digital', name: 'Digital Board', category: 'Specialty boards', tag: 'Interactive', visual: 'digital', summary: 'Explore a digital display option for presentations and learning.', uses: ['Classrooms', 'Offices'], keywords: 'interactive digital screen display', options: [{ label: '75 inch', price: 160000 }, { label: '85 inch', price: 200000 }] },
];

// Product photos live in public/products/<id>.webp (square, ~800px). A missing file falls back to the SVG illustration.
export const products = catalogue.map(product => ({ ...product, image: `/products/${product.id}.webp` }));

export const categories =['All boards', 'Writing boards', 'Display boards', 'Specialty boards'];
export const byId = Object.fromEntries(products.map(product => [product.id, product]));

/** Price (₹) of one board for a product and size label, or null when no confirmed price exists. */
export const priceFor = (id, size) => byId[id]?.options?.find(option => option.label === size)?.price ?? null;
/** Lowest listed price for a product, or null. */
export const startingPrice = product => product.options ? Math.min(...product.options.map(option => option.price)) : null;
export const formatPrice = value => `₹${value.toLocaleString('en-IN')}`;
