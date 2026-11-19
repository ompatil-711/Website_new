import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import BoardVisual from './BoardVisual';
import { byId, categories, products } from './products';
import { Icon, QuantityControl } from './StoreApp';
import QuoteDrawer from './QuoteDrawer';

const STORAGE_KEY = 'paradise-board-quote-cart-v1';
const uses = ['All spaces', 'Classrooms', 'Offices', 'Institutions'];

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

function ProductCard({ product, onOpen, onAdd }) {
  return <motion.article className="market-card" whileHover={{ y: -4 }} transition={{ duration: .18 }}>
    <button className={`market-card-image visual-${product.visual}`} onClick={() => onOpen(product.id)} aria-label={`View ${product.name}`}>
      {product.tag && <span className="market-badge">{product.tag}</span>}
      <BoardVisual product={product} />
    </button>
    <div className="market-card-body">
      <span className="market-card-category">{product.category}</span>
      <button className="market-card-title" onClick={() => onOpen(product.id)}>{product.name}</button>
      <p>{product.summary}</p>
      <div className="market-card-price"><strong>Price on request</strong><span>Custom quote</span></div>
      <div className="market-card-actions"><button onClick={() => onAdd(product.id)} className="market-add">Add to quote <Icon name="plus" size={16} /></button><button onClick={() => onOpen(product.id)} className="market-view" aria-label={`View ${product.name} details`}>View details</button></div>
    </div>
  </motion.article>;
}

function ProductPage({ product, onBack, onAdd, onOpen }) {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  useEffect(() => { setSize(''); setQuantity(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [product.id]);
  const related = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 3);
  return <main className="market-product-page market-container">
    <nav className="market-crumbs" aria-label="Breadcrumb"><button onClick={onBack}>Home</button><span>/</span><button onClick={onBack}>{product.category}</button><span>/</span><span>{product.name}</span></nav>
    <div className="market-product-layout">
      <div className={`market-product-art visual-${product.visual}`}><BoardVisual product={product} /><span>Product illustration for reference</span></div>
      <div className="market-product-info"><span className="market-card-category">{product.category}</span><h1>{product.name}</h1><p className="market-product-summary">{product.summary}</p><div className="market-product-price"><strong>Price on request</strong><span>Pricing depends on size, quantity and requirements.</span></div><div className="market-product-benefits"><span>✓ Tailored to your requirements</span><span>✓ Availability confirmed by our team</span><span>✓ Quote before you order</span></div><label htmlFor="market-size">Required size or specification <small>Optional</small></label><input id="market-size" maxLength={100} value={size} onChange={event => setSize(event.target.value)} placeholder="e.g. 4 × 3 ft, wall mounted" /><label>Quantity</label><div className="market-product-actions"><QuantityControl value={quantity} onChange={setQuantity} label={`${product.name} quantity`} /><button className="market-primary" onClick={() => onAdd(product.id, quantity, size)}>Add to quote cart <Icon name="arrow" size={18} /></button></div><p className="market-product-note">Verify your email before sending your quote request. We’ll confirm price, delivery and payment details by email.</p></div>
    </div>
    {related.length > 0 && <section className="market-related"><div className="market-section-title"><h2>You may also need</h2><button onClick={onBack}>View all boards →</button></div><div className="market-grid">{related.map(item => <ProductCard key={item.id} product={item} onOpen={onOpen} onAdd={onAdd} />)}</div></section>}
  </main>;
}

export default function MarketStore() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All boards');
  const [use, setUse] = useState('All spaces');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState('cart');
  const [selectedProduct, setSelectedProduct] = useState(productFromHash);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { const update = () => setSelectedProduct(productFromHash()); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update); }, []);
  useEffect(() => { if (!toast) return; const timeout = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timeout); }, [toast]);
  useEffect(() => { if (!cartOpen) return; const prior = document.body.style.overflow; document.body.style.overflow = 'hidden'; const escape = event => { if (event.key === 'Escape') setCartOpen(false); }; window.addEventListener('keydown', escape); return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', escape); }; }, [cartOpen]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = products.filter(product => (category === 'All boards' || product.category === category) && (use === 'All spaces' || product.uses.includes(use)) && (!term || `${product.name} ${product.category} ${product.summary} ${product.keywords}`.toLowerCase().includes(term)));
    return sort === 'alphabetical' ? [...result].sort((a, b) => a.name.localeCompare(b.name)) : result;
  }, [query, category, use, sort]);
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(id, quantity = 1, size = '') {
    const trimmed = size.trim();
    setCart(previous => { const index = previous.findIndex(item => item.id === id && item.size.toLowerCase() === trimmed.toLowerCase()); return index < 0 ? [...previous, { id, quantity, size: trimmed }] : previous.map((item, i) => i === index ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item); });
    setToast(`${byId[id].name} added to quote cart`);
  }
  function openProduct(id) { window.location.hash = `#product/${id}`; setSelectedProduct(id); }
  function backToShop() { window.history.pushState(null, '', window.location.pathname + window.location.search); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function openCart() { setCartStep('cart'); setCartOpen(true); }
  function selectCategory(item) { setCategory(item); setFiltersOpen(false); if (selectedProduct) backToShop(); else document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }
  function updateItem(index, patch) { setCart(previous => previous.map((item, i) => i === index ? { ...item, ...patch } : item)); }

  return <div className="market-site">
    <div className="market-topline"><div className="market-container"><span>Boards for classrooms, offices & more</span><span>Need help? <a href="tel:+919922404078">+91 99224 04078</a></span></div></div>
    <header className="market-header"><div className="market-container market-header-main"><a className="market-brand" href="/ecommerce/" onClick={event => { if (selectedProduct) { event.preventDefault(); backToShop(); } }}><span className="market-brand-mark">P</span><span><strong>Paradise Enterprise</strong><small>BOARD STORE</small></span></a><div className="market-search"><Icon name="search" size={19} /><input type="search" value={query} onChange={event => { setQuery(event.target.value); if (selectedProduct) backToShop(); }} onKeyDown={event => { if (event.key === 'Enter') document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }} placeholder="Search whiteboards, greenboards, notice boards..." aria-label="Search products" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" size={16} /></button>}</div><div className="market-header-actions"><a className="market-main-link" href="/">Main website ↗</a><button className="market-cart-button" onClick={openCart}><Icon name="bag" size={21} /><span>Quote cart</span><b>{count}</b></button></div></div><nav className="market-container market-nav" aria-label="Product categories">{categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => selectCategory(item)}>{item}</button>)}<span>Request a quote • No payment required</span></nav></header>

    {selectedProduct ? <ProductPage key={selectedProduct} product={byId[selectedProduct]} onBack={backToShop} onAdd={addToCart} onOpen={openProduct} /> : <main>
      <section className="market-promo market-container"><div className="market-promo-copy"><span className="market-kicker">THE BOARD COLLECTION</span><h1>The right board for <em>every space.</em></h1><p>Explore writing, display and specialty boards. Build your quote cart and tell us exactly what you need.</p><a href="#catalog" className="market-primary">Shop all boards <Icon name="arrow" size={18} /></a></div><div className="market-promo-art" aria-hidden="true"><div className="market-promo-green">Ideas grow here.</div><div className="market-promo-white">Make it clear.</div></div></section>
      <div className="market-perks market-container"><div><b>01</b><span><strong>Explore the range</strong><small>11 board options</small></span></div><div><b>02</b><span><strong>Add your requirements</strong><small>Size and quantity</small></span></div><div><b>03</b><span><strong>Request a quote</strong><small>Our team confirms the details</small></span></div></div>
      <section id="catalog" className="market-catalog market-container"><div className="market-catalog-heading"><div><span className="market-kicker">SHOP THE COLLECTION</span><h2>Shop boards</h2><p>Find the surface that fits your space and request a tailored quote.</p></div><span>{visible.length} product{visible.length === 1 ? '' : 's'}</span></div>
        <div className="market-catalog-layout"><aside className={`market-filters ${filtersOpen ? 'open' : ''}`}><div className="market-filter-head"><strong>Filters</strong><button onClick={() => { setCategory('All boards'); setUse('All spaces'); }}>Clear all</button></div><div className="market-filter-group"><h3>Category</h3>{categories.map(item => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}><span className="market-radio" />{item}<small>{item === 'All boards' ? products.length : products.filter(product => product.category === item).length}</small></button>)}</div><div className="market-filter-group"><h3>Shop by space</h3>{uses.map(item => <button key={item} className={use === item ? 'selected' : ''} onClick={() => setUse(item)}><span className="market-radio" />{item}</button>)}</div><div className="market-filter-help"><strong>Need a custom size?</strong><p>Add a note when you request your quote.</p></div></aside><div className="market-results"><div className="market-toolbar"><button className="market-mobile-filter" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}>Filters {(category !== 'All boards' || use !== 'All spaces') && '•'}</button><span>Showing {visible.length} of {products.length} products</span><label>Sort by <select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="alphabetical">Name A–Z</option></select></label></div>{visible.length ? <div className="market-grid">{visible.map(product => <ProductCard key={product.id} product={product} onOpen={openProduct} onAdd={addToCart} />)}</div> : <div className="market-empty"><h3>No boards found</h3><p>Try another search or clear your filters.</p><button className="market-primary" onClick={() => { setQuery(''); setCategory('All boards'); setUse('All spaces'); }}>Show all boards</button></div>}</div></div>
      </section><section className="market-help market-container"><div><span className="market-kicker">HERE TO HELP</span><h2>Know what you need? Get a quote.</h2><p>Send your selected boards, sizes and quantities. We’ll confirm availability, pricing and delivery.</p></div><button className="market-primary" onClick={openCart}>Open quote cart <Icon name="arrow" size={18} /></button></section>
    </main>}
    <footer className="market-footer"><div className="market-container"><div><strong>Paradise Enterprise</strong><p>Writing and display boards for classrooms, workplaces and institutions.</p></div><div><strong>Explore</strong><button onClick={backToShop}>All boards</button><a href="/">Main website</a></div><div><strong>Contact</strong><a href="tel:+919922404078">+91 99224 04078</a><button onClick={openCart}>Request a quote</button></div></div><small>Product illustrations are representative. Specifications, pricing, delivery and payment are confirmed with your quote.</small></footer>
    {cartOpen && <QuoteDrawer items={cart} step={cartStep} onStep={setCartStep} onClose={() => setCartOpen(false)} onQuantity={(index, quantity) => updateItem(index, { quantity })} onSize={(index, size) => updateItem(index, { size })} onRemove={index => setCart(previous => previous.filter((_, i) => i !== index))} onSuccess={() => setCart([])} />}
    {toast && <div className="market-toast" role="status">✓ {toast}<button onClick={openCart}>View cart</button></div>}
  </div>;
}
