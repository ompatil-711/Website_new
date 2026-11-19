import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import BoardVisual from './BoardVisual';
import { byId, categories, products } from './products';

const STORAGE_KEY = 'paradise-board-quote-cart-v1';
const WHATSAPP_NUMBER = '919922404078';

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(item => byId[item.id] && Number.isInteger(item.quantity) && item.quantity > 0).map(item => ({ id: item.id, quantity: Math.min(item.quantity, 99), size: typeof item.size === 'string' ? item.size.slice(0, 100) : '' })) : [];
  } catch { return []; }
}

function productFromHash() {
  const match = window.location.hash.match(/^#product\/([a-z-]+)$/);
  return match && byId[match[1]] ? match[1] : null;
}

function useDialogFocus() {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    const focusable = () => [...dialog.querySelectorAll('a[href], button:not(:disabled), input, select, textarea')];
    focusable()[0]?.focus();
    function trap(event) {
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    dialog.addEventListener('keydown', trap);
    return () => { dialog.removeEventListener('keydown', trap); previous?.focus?.(); };
  }, []);
  return ref;
}

export function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'search') return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
  if (name === 'bag') return <svg {...common}><path d="M4 8h16l-1.2 13H5.2L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
  if (name === 'close') return <svg {...common}><path d="M5 5 19 19M19 5 5 19" /></svg>;
  if (name === 'arrow') return <svg {...common}><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
  if (name === 'check') return <svg {...common}><path d="m4 12 5 5L20 6" /></svg>;
  if (name === 'menu') return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
  if (name === 'minus') return <svg {...common}><path d="M5 12h14" /></svg>;
  if (name === 'plus') return <svg {...common}><path d="M5 12h14M12 5v14" /></svg>;
  return null;
}

function Brand() {
  return <a className="shop-brand" href="/ecommerce/" aria-label="Paradise Enterprise board shop home"><span className="shop-brand-mark">P</span><span><strong>Paradise Enterprise</strong><small>THE BOARD SHOP</small></span></a>;
}

function ProductCard({ product, onOpen, onAdd }) {
  return <motion.article className="product-card" whileHover={{ y: -5 }} transition={{ duration: .2 }}>
    <button className={`product-image visual-${product.visual}`} onClick={() => onOpen(product.id)} aria-label={`View ${product.name} details`}>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <BoardVisual product={product} />
    </button>
    <div className="product-card-copy"><span className="product-category">{product.category}</span><button className="product-title" onClick={() => onOpen(product.id)}>{product.name}</button><p>{product.summary}</p><div className="product-card-bottom"><span>Price on request</span><button className="quick-add" onClick={() => onAdd(product.id)} aria-label={`Add ${product.name} to quote cart`}><Icon name="plus" size={18} /></button></div></div>
  </motion.article>;
}

export function QuantityControl({ value, onChange, label }) {
  return <div className="quantity-control" aria-label={label}><button type="button" aria-label={`Decrease ${label}`} disabled={value <= 1} onClick={() => onChange(value - 1)}><Icon name="minus" size={15} /></button><span>{value}</span><button type="button" aria-label={`Increase ${label}`} disabled={value >= 99} onClick={() => onChange(value + 1)}><Icon name="plus" size={15} /></button></div>;
}

function ProductDetails({ product, onClose, onAdd }) {
  const dialogRef = useDialogFocus();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  return <div className="overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section ref={dialogRef} className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="detail-title">
    <button className="icon-button detail-close" type="button" aria-label="Close product details" onClick={onClose}><Icon name="close" /></button>
    <div className={`detail-art visual-${product.visual}`}><BoardVisual product={product} /><span>Illustration for reference</span></div>
    <div className="detail-copy"><span className="eyebrow">{product.category}</span><h2 id="detail-title">{product.name}</h2><p>{product.summary}</p><div className="detail-rule" /><h3>Tell us what you need</h3><p className="detail-hint">Select a quantity and add any size or specification you have in mind. We’ll confirm availability and pricing in your quote.</p><label className="field-label" htmlFor="desired-size">Desired size or specification <span>Optional</span></label><input id="desired-size" maxLength={100} value={size} onChange={event => setSize(event.target.value)} placeholder="e.g. 4 × 3 ft, wall mounted" /><div className="detail-actions"><QuantityControl value={quantity} onChange={setQuantity} label={`${product.name} quantity`} /><button className="button-primary" type="button" onClick={() => { onAdd(product.id, quantity, size); onClose(); }}>Add to quote cart <Icon name="arrow" size={18} /></button></div><span className="detail-price">Price shared after size and requirements are confirmed</span></div>
  </section></div>;
}

export function CartDrawer({ items, step, onStep, onClose, onQuantity, onSize, onRemove }) {
  const dialogRef = useDialogFocus();
  const [customer, setCustomer] = useState({ name: '', phone: '', city: '', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const message = useMemo(() => {
    const lines = ['Hello Paradise Enterprise, I would like a quote for these boards:', '', ...items.map((item, index) => `${index + 1}. ${byId[item.id].name} — Qty: ${item.quantity}${item.size ? ` — Size/spec: ${item.size}` : ''}`), '', `Name: ${customer.name.trim()}`, `Phone: ${customer.phone.trim()}`, `City/area: ${customer.city.trim()}`];
    if (customer.note.trim()) lines.push(`Notes: ${customer.note.trim()}`);
    lines.push('', 'Please confirm availability, price, delivery and payment details.');
    return lines.join('\n');
  }, [items, customer]);
  function submit(event) {
    event.preventDefault();
    if (!items.length) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }
  return <div className="overlay drawer-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><aside ref={dialogRef} className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
    <div className="drawer-head"><div><span className="eyebrow">{step === 'checkout' ? 'REQUEST A QUOTE' : 'YOUR SELECTION'}</span><h2 id="cart-title">{step === 'checkout' ? 'Send your enquiry' : 'Quote cart'}</h2></div><button className="icon-button" type="button" aria-label="Close quote cart" onClick={onClose}><Icon name="close" /></button></div>
    {step === 'cart' ? <><div className="drawer-body">{items.length ? items.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><div className={`cart-art visual-${byId[item.id].visual}`}><BoardVisual product={byId[item.id]} /></div><div className="cart-item-copy"><strong>{byId[item.id].name}</strong><span>Price on request</span><label className="field-label" htmlFor={`cart-size-${index}`}>Size / specification</label><input id={`cart-size-${index}`} value={item.size} maxLength={100} placeholder="Optional" onChange={event => onSize(index, event.target.value)} /><div className="cart-row"><QuantityControl value={item.quantity} label={`${byId[item.id].name} quantity`} onChange={value => onQuantity(index, value)} /><button className="text-button" type="button" onClick={() => onRemove(index)}>Remove</button></div></div></div>) : <div className="empty-cart"><span className="empty-cart-icon"><Icon name="bag" size={30}/></span><h3>Your quote cart is empty</h3><p>Explore the collection and add the boards you’re interested in.</p><button type="button" className="button-primary" onClick={onClose}>Browse boards <Icon name="arrow" size={17}/></button></div>}</div>{items.length > 0 && <div className="drawer-foot"><div className="cart-summary"><strong>{items.reduce((total, item) => total + item.quantity, 0)} board{items.reduce((total, item) => total + item.quantity, 0) === 1 ? '' : 's'} selected</strong><span>Pricing confirmed by our team</span></div><button type="button" className="button-primary full" onClick={() => onStep('checkout')}>Continue to quote request <Icon name="arrow" size={18}/></button></div>}</> : <><div className="drawer-body"><button type="button" className="back-step" onClick={() => onStep('cart')}>← Edit cart</button><div className="checkout-summary">{items.map((item, index) => <div key={`${item.id}-${index}`}><span>{byId[item.id].name} × {item.quantity}{item.size ? ` · ${item.size}` : ''}</span><strong>Quote</strong></div>)}</div><p className="checkout-intro">Share your contact details and we’ll respond with confirmed pricing and availability. Your message opens in WhatsApp for you to send.</p><form id="quote-form" onSubmit={submit}><label className="field-label" htmlFor="customer-name">Full name *</label><input id="customer-name" required minLength={2} maxLength={80} value={customer.name} onChange={event => setCustomer({ ...customer, name: event.target.value })} placeholder="Your name" /><label className="field-label" htmlFor="customer-phone">Phone number *</label><input id="customer-phone" required type="tel" pattern="[+0-9 ()-]{10,20}" maxLength={20} value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} placeholder="+91 00000 00000" /><label className="field-label" htmlFor="customer-city">City / delivery area *</label><input id="customer-city" required minLength={2} maxLength={80} value={customer.city} onChange={event => setCustomer({ ...customer, city: event.target.value })} placeholder="City or area" /><label className="field-label" htmlFor="customer-note">More details <span>Optional</span></label><textarea id="customer-note" maxLength={500} rows={3} value={customer.note} onChange={event => setCustomer({ ...customer, note: event.target.value })} placeholder="Installation, quantity, preferred timeline…" /></form>{submitted && <p className="checkout-confirm" role="status">WhatsApp opened with your enquiry. Please press Send there to share it with us.</p>}</div><div className="drawer-foot"><button className="button-primary full" type="submit" form="quote-form">Open WhatsApp to send <Icon name="arrow" size={18}/></button><small>Final price, delivery and payment are confirmed by our team.</small></div></>}
  </aside></div>;
}

export default function StoreApp() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All boards');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState('cart');
  const [selectedProduct, setSelectedProduct] = useState(productFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { const update = () => setSelectedProduct(productFromHash()); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update); }, []);
  useEffect(() => { if (!selectedProduct && !cartOpen) return; const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; const escape = event => { if (event.key === 'Escape') { setCartOpen(false); window.history.replaceState(null, '', window.location.pathname + window.location.search); setSelectedProduct(null); } }; window.addEventListener('keydown', escape); return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', escape); }; }, [selectedProduct, cartOpen]);
  useEffect(() => { if (!toast) return; const timeout = setTimeout(() => setToast(''), 2500); return () => clearTimeout(timeout); }, [toast]);
  const visibleProducts = useMemo(() => { const term = query.trim().toLowerCase(); const result = products.filter(product => (category === 'All boards' || product.category === category) && (!term || `${product.name} ${product.category} ${product.summary} ${product.keywords}`.toLowerCase().includes(term))); return sort === 'alphabetical' ? [...result].sort((a, b) => a.name.localeCompare(b.name)) : result; }, [query, category, sort]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  function addToCart(id, quantity = 1, size = '') {
    setCart(previous => { const existing = previous.findIndex(item => item.id === id && item.size.toLowerCase() === size.trim().toLowerCase()); if (existing < 0) return [...previous, { id, quantity, size: size.trim() }]; return previous.map((item, index) => index === existing ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item); });
    setToast(`${byId[id].name} added to quote cart`);
  }
  function openCart() { setCartStep('cart'); setCartOpen(true); }
  function openProduct(id) { window.location.hash = `#product/${id}`; setSelectedProduct(id); }
  function closeProduct() { window.history.replaceState(null, '', window.location.pathname + window.location.search); setSelectedProduct(null); }
  function updateItem(index, patch) { setCart(previous => previous.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item)); }
  return <div className="store-page">
    <div className="announcement">PARADISE ENTERPRISE <span>✦</span> WRITING & DISPLAY BOARDS <span>✦</span> EST. 2001</div>
    <header className="site-header"><div className="header-inner"><Brand /><nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Shop navigation"><a href="#shop" onClick={() => setMenuOpen(false)}>Shop all boards</a><a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="/" onClick={() => setMenuOpen(false)}>Main website ↗</a></nav><div className="header-actions"><button className="cart-trigger" type="button" onClick={openCart} aria-label={`Open quote cart, ${cartCount} items`}><Icon name="bag" size={20} /><span>Quote cart</span><b>{cartCount}</b></button><button className="menu-trigger icon-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button></div></div></header>
    <main><section className="shop-hero"><div className="hero-copy"><span className="eyebrow"><i /> THE BOARD COLLECTION</span><h1>Space for <em>every idea.</em></h1><p>Find the right writing or display board for your classroom, office or institution. Explore the collection, build your selection and request a tailored quote.</p><div className="hero-buttons"><a className="button-primary" href="#shop">Explore boards <Icon name="arrow" size={19}/></a><a className="button-plain" href="#how-it-works">How ordering works <span aria-hidden="true">↗</span></a></div><div className="hero-proof"><span><Icon name="check" size={16}/> Whiteboards & greenboards</span><span><Icon name="check" size={16}/> Made for your space</span></div></div><div className="hero-art" aria-hidden="true"><span className="hero-art-kicker">BUILT FOR THE NEXT BIG IDEA</span><div className="hero-green-board"><span>Learn.</span></div><div className="hero-white-board"><span>Create.</span></div><div className="hero-art-footer"><span>CLASSROOMS</span><i/> <span>WORKPLACES</span><i/> <span>INSTITUTIONS</span></div></div></section>
      <section className="value-strip" aria-label="Shopping benefits"><div><span className="value-icon">01</span><strong>Explore the range</strong><small>Writing, display & specialty boards</small></div><div><span className="value-icon">02</span><strong>Choose what fits</strong><small>Add sizes and quantities to your cart</small></div><div><span className="value-icon">03</span><strong>Get a tailored quote</strong><small>Confirmed pricing from our team</small></div></section>
      <section id="categories" className="category-section"><div className="section-heading"><span className="eyebrow">SHOP BY CATEGORY</span><h2>Start with the right surface.</h2></div><div className="category-cards">{categories.slice(1).map((item, index) => <button key={item} type="button" className={`category-card category-${index}`} onClick={() => { setCategory(item); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="category-index">0{index + 1} / COLLECTION</span><strong>{item}</strong><span className="category-count">{products.filter(product => product.category === item).length} options <Icon name="arrow" size={18}/></span></button>)}</div></section>
      <section id="shop" className="shop-section"><div className="section-heading shop-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Find your board.</h2><p>Browse the products in our current board range.</p></div><span className="results-count">{visibleProducts.length} products</span></div><div className="catalog-tools"><div className="search-box"><Icon name="search" size={19}/><input type="search" aria-label="Search boards" placeholder="Search boards…" value={query} onChange={event => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><Icon name="close" size={15}/></button>}</div><div className="category-filters" role="group" aria-label="Filter by category">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="sort-control">Sort <select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="alphabetical">Name A–Z</option></select></label></div>{visibleProducts.length ? <div className="product-grid">{visibleProducts.map(product => <ProductCard key={product.id} product={product} onOpen={openProduct} onAdd={addToCart} />)}</div> : <div className="no-results"><h3>No boards found</h3><p>Try another search or browse the full collection.</p><button type="button" onClick={() => { setQuery(''); setCategory('All boards'); }}>Show all boards</button></div>}</section>
      <section id="how-it-works" className="how-section"><div className="how-lead"><span className="eyebrow">SIMPLE FROM START TO FINISH</span><h2>From your shortlist<br/>to the right board.</h2><p>Board sizes, quantities and installation needs vary by space. Send us your selection and we’ll put together a quote for your project.</p><a className="button-primary" href="#shop">Explore the collection <Icon name="arrow" size={18}/></a></div><div className="how-steps"><div><b>01</b><span><strong>Browse the collection</strong><small>Explore boards for writing, display and specialised uses.</small></span></div><div><b>02</b><span><strong>Build your quote cart</strong><small>Add quantities and tell us your preferred size or specification.</small></span></div><div><b>03</b><span><strong>Send your enquiry</strong><small>Open WhatsApp with your selection. Our team confirms pricing and next steps.</small></span></div></div></section>
      <section className="help-banner"><div><span className="eyebrow">NEED A HAND?</span><h2>Not sure which board fits?</h2><p>Tell us about your space and we’ll help you narrow it down.</p></div><a href="/#contact" className="button-light">Talk to our team <Icon name="arrow" size={18}/></a></section></main>
    <footer className="shop-footer"><div className="footer-main"><div><Brand /><p>Quality boards and institutional solutions from Paradise Enterprise, Nagpur.</p></div><div><strong>Explore</strong><a href="#shop">All boards</a><a href="#categories">Categories</a><a href="#how-it-works">How it works</a></div><div><strong>Connect</strong><a href="/">Main website</a><a href="/#contact">Contact us</a><a href="tel:+919922404078">+91 99224 04078</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Paradise Enterprise</span><span>Nagpur, Maharashtra · Since 2001</span></div></footer>
    {toast && <div className="toast" role="status"><Icon name="check" size={17}/>{toast}<button type="button" onClick={openCart}>View cart</button></div>}
    {selectedProduct && <ProductDetails key={selectedProduct} product={byId[selectedProduct]} onClose={closeProduct} onAdd={addToCart} />}
    {cartOpen && <CartDrawer items={cart} step={cartStep} onStep={setCartStep} onClose={() => setCartOpen(false)} onQuantity={(index, quantity) => updateItem(index, { quantity })} onSize={(index, size) => updateItem(index, { size })} onRemove={index => setCart(previous => previous.filter((_, itemIndex) => itemIndex !== index))} />}
  </div>;
}
