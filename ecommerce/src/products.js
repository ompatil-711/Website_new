// Product names come from the supplied handwritten list and the existing site.
// Descriptions are intentionally broad until specifications and prices are confirmed.
export const products = [
  { id: 'whiteboard', name: 'Whiteboard', category: 'Writing boards', tag: 'Popular', visual: 'white', summary: 'A clear writing surface for classrooms, meeting rooms and everyday planning.', uses: ['Classrooms', 'Offices'], keywords: 'white marker dry erase writing' },
  { id: 'greenboard', name: 'Greenboard', category: 'Writing boards', tag: 'Classroom pick', visual: 'green', summary: 'The familiar green writing board for teaching, practice and shared ideas.', uses: ['Classrooms', 'Institutions'], keywords: 'green chalk classroom writing' },
  { id: 'chalkboard', name: 'Chalkboard', category: 'Writing boards', visual: 'black', summary: 'A classic chalk writing surface for lessons and announcements.', uses: ['Classrooms', 'Institutions'], keywords: 'black chalk writing' },
  { id: 'pinup-notice', name: 'Pin-up Notice Board', category: 'Display boards', visual: 'pin', summary: 'Keep notices, reminders and important information in view.', uses: ['Offices', 'Institutions'], keywords: 'notice pin bulletin display' },
  { id: 'combination', name: 'Combination Board', category: 'Display boards', visual: 'combo', summary: 'Bring writing and display space together on one board.', uses: ['Classrooms', 'Offices'], keywords: 'combo writing notice pin display' },
  { id: 'acrylic-cover', name: 'Acrylic Cover Board', category: 'Display boards', visual: 'acrylic', summary: 'A covered display format for presenting information neatly.', uses: ['Offices', 'Institutions'], keywords: 'acrylic cover display notice' },
  { id: 'magnetic', name: 'Magnetic Board', category: 'Specialty boards', visual: 'magnetic', summary: 'A board option for arranging notes and visual information.', uses: ['Classrooms', 'Offices'], keywords: 'magnet magnetic writing' },
  { id: 'ceramic', name: 'Ceramic Board', category: 'Specialty boards', visual: 'ceramic', summary: 'A ceramic board option for a clean, professional space.', uses: ['Offices', 'Institutions'], keywords: 'ceramic writing' },
  { id: 'key-board', name: 'Key Board', category: 'Specialty boards', visual: 'key', summary: 'An organised board format for keeping track of keys.', uses: ['Offices', 'Institutions'], keywords: 'key storage organisation' },
  { id: 'drawing', name: 'Drawing Board', category: 'Specialty boards', visual: 'drawing', summary: 'A dedicated surface for sketching, drafting and creative work.', uses: ['Classrooms', 'Institutions'], keywords: 'drawing sketch art draft' },
  { id: 'digital', name: 'Digital Board', category: 'Specialty boards', tag: 'Interactive', visual: 'digital', summary: 'Explore a digital display option for presentations and learning.', uses: ['Classrooms', 'Offices'], keywords: 'interactive digital screen display' },
];

export const categories = ['All boards', 'Writing boards', 'Display boards', 'Specialty boards'];
export const byId = Object.fromEntries(products.map(product => [product.id, product]));
