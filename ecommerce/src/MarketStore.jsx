import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { DotField, Split, ease, useStill } from '../../src/site/motion';
import ProductImage from './ProductImage';
import { byId, categories, groups, groupById, products, productsIn, priceFor, startingPrice, formatPrice } from './products';
import { Icon, QuantityControl } from './StoreApp';
import QuoteDrawer from './QuoteDrawer';
import Lenis from 'lenis';

const STORAGE_KEY = 'paradise-board-quote-cart-v1';
const uses = ['All spaces', 'Classrooms', 'Offices', 'Institutions'];

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(item => byId[item.id] && Number.isInteger(item.quantity) && item.quantity > 0).map(item => { const size = typeof item.size === 'string' ? item.size.slice(0, 100) : ''; return { id: item.id, quantity: Math.min(item.quantity, 99), size: byId[item.id].options && priceFor(item.id, size) === null ? '' : size }; }) : [];
  } catch { return []; }
}

function productFromHash() {
  const match = window.location.hash.match(/^#product\/([a-z-]+)$/);
  return match && byId[match[1]] ? match[1] : null;
}

function groupFromHash() {
  const match = window.location.hash.match(/^#group\/([a-z]+)$/);
  return match && groupById[match[1]] ? match[1] : null;
}
const groupTabs = [{ id: 'all', name: 'All products' }, ...groups];
const unit = product => product.group === 'boards' ? 'per board' : 'each';

function LogoMark() {
  return <svg className="lmark" viewBox="0 0 48 48" aria-hidden="true"><rect className="lmark__bg" width="48" height="48" rx="12" /><path className="lmark__g" fillRule="evenodd" d="M13 38V10h13a10 10 0 0 1 0 20h-5.5v8zM20.5 16v8H26a4 4 0 0 0 0-8z" /><rect className="lmark__acc" x="26" y="33" width="10" height="5" rx="2.5" /></svg>;
}

function ProductCard({ product, onOpen, onAdd, index = 0 }) {
  const still = useStill();
  return <motion.article className="market-card" whileHover={still ? undefined : { y: -4 }}
    initial={still ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .6, delay: (index % 3) * .07, ease }}>
    <button className={`market-card-image visual-${product.visual}`} onClick={() => onOpen(product.id)} aria-label={`View ${product.name}`}>
      {product.tag && <span className="market-badge">{product.tag}</span>}
      <ProductImage product={product} />
    </button>
    <div className="market-card-body">
      <span className="market-card-category">{product.category}</span>
      <button className="market-card-title" onClick={() => onOpen(product.id)}>{product.name}</button>
      <p>{product.summary}</p>
      <div className="market-card-price">{product.options ? <><strong>From {formatPrice(startingPrice(product))}</strong><span>{product.options.length} sizes · {unit(product)}</span></> : <><strong>Price on request</strong><span>Custom quote</span></>}</div>
      <div className="market-card-actions"><button onClick={() => product.options ? onOpen(product.id) : onAdd(product.id)} className="market-add">{product.options ? 'Choose size' : 'Add to quote'} <Icon name="plus" size={16} /></button><button onClick={() => onOpen(product.id)} className="market-view" aria-label={`View ${product.name} details`}>View details</button></div>
    </div>
  </motion.article>;
}

function ProductPage({ product, onBack, onGroup, onAdd, onOpen }) {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  useEffect(() => { setSize(product.options?.[0].label ?? ''); setQuantity(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [product.id, product.options]);
  const unitPrice = priceFor(product.id, size);
  const related = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 3);
  return <main className="market-product-page market-container">
    <nav className="market-crumbs" aria-label="Breadcrumb"><button onClick={onBack}>Home</button><span>/</span><button onClick={() => onGroup(product.group)}>{groupById[product.group].name}</button><span>/</span><span>{product.name}</span></nav>
    <div className="market-product-layout">
      <div className={`market-product-art visual-${product.visual}`}><ProductImage product={product} eager /><span>Image for reference. Size, finish and specifications are confirmed with your quote.</span></div>
      <div className="market-product-info"><span className="market-card-category">{product.category}</span><h1>{product.name}</h1><p className="market-product-summary">{product.summary}</p><div className="market-product-price">{unitPrice !== null ? <><strong>{formatPrice(unitPrice)} <small>{unit(product)}</small></strong><span>For {size}. {quantity > 1 && `Total for ${quantity}: ${formatPrice(unitPrice * quantity)}. `}Final price, delivery and payment are confirmed with your quote.</span></> : <><strong>Price on request</strong><span>Pricing depends on size, quantity and requirements.</span></>}</div><div className="market-product-benefits"><span>✓ Tailored to your requirements</span><span>✓ Availability confirmed by our team</span><span>✓ Quote before you order</span></div>{product.options ? <><label htmlFor="market-size">Size</label><select id="market-size" value={size} onChange={event => setSize(event.target.value)}>{product.options.map(option => <option key={option.label} value={option.label}>{option.label} — {formatPrice(option.price)}</option>)}</select></> : <><label htmlFor="market-size">Required size or specification <small>Optional</small></label><input id="market-size" maxLength={100} value={size} onChange={event => setSize(event.target.value)} placeholder={product.group === 'boards' ? 'e.g. 4 × 3 ft, wall mounted' : 'e.g. size, capacity or model'} /></>}<label>Quantity</label><div className="market-product-actions"><QuantityControl value={quantity} onChange={setQuantity} label={`${product.name} quantity`} /><button className="market-primary" onClick={() => onAdd(product.id, quantity, size)}>Add to quote cart <Icon name="arrow" size={18} /></button></div><p className="market-product-note">Verify your email before sending your quote request. We’ll confirm price, delivery and payment details by email.</p></div>
    </div>
    {related.length > 0 && <section className="market-related"><div className="market-section-title"><h2>You may also need</h2><button onClick={() => onGroup('all')}>View all products →</button></div><div className="market-grid">{related.map(item => <ProductCard key={item.id} product={item} onOpen={onOpen} onAdd={onAdd} />)}</div></section>}
  </main>;
}

function PromoArt() {
  const still = useStill();
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 }); const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const gx = useTransform(sx, [-1, 1], [-14, 14]); const gy = useTransform(sy, [-1, 1], [-10, 10]);
  const wx = useTransform(sx, [-1, 1], [24, -24]); const wy = useTransform(sy, [-1, 1], [18, -18]);
  const rot = useTransform(sx, [-1, 1], [-2, 2]);
  const move = e => { if (still) return; const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width - .5) * 2); my.set(((e.clientY - r.top) / r.height - .5) * 2); };
  const leave = () => { mx.set(0); my.set(0); };
  const pop = (d, from) => still ? {} : { initial: { opacity: 0, scale: .9, ...from }, animate: { opacity: 1, scale: 1, x: 0, y: 0 }, transition: { duration: 1.1, delay: d, ease } };
  return <div className="market-art" onPointerMove={move} onPointerLeave={leave}>
    <motion.div className="mart mart--green" style={still ? undefined : { x: gx, y: gy, rotate: rot }} {...pop(.3, { x: -70 })}>
      <svg viewBox="0 0 400 240" aria-hidden="true"><path className="draw" pathLength="1" d="M40 60 h200" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" style={{ '--t': '5s' }} /><path className="draw" pathLength="1" d="M40 110 h150" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" style={{ '--t': '5s', '--d': '.5s' }} /><path className="draw" pathLength="1" d="M40 165 q35 -45 70 0 t70 0 t70 0" stroke="#c8d8e4" strokeWidth="7" strokeLinecap="round" fill="none" style={{ '--t': '5s', '--d': '1s' }} /></svg>
      <strong>Ideas grow here.</strong>
    </motion.div>
    <motion.div className="mart mart--white" style={still ? undefined : { x: wx, y: wy }} {...pop(.55, { y: 70 })}>
      <strong>Make it clear.</strong>
      <svg viewBox="0 0 400 120" aria-hidden="true"><path className="draw" pathLength="1" d="M30 70 L110 30 L180 55 L260 15 L370 40" stroke="#2b6777" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ '--t': '5s', '--d': '.4s' }} /></svg>
    </motion.div>
    <span className="mchip mchip--a">Prices by size</span><span className="mchip mchip--b">Quote only, no payment</span>
  </div>;
}

function Hero() {
  const still = useStill();
  const up = i => still ? {} : { initial: { y: 28, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: .9, delay: .45 + i * .1, ease } };
  return <section className="market-hero">
    <DotField tone="light" />
    <div className="market-container market-hero__grid">
      <div className="market-hero__copy">
        <motion.span className="market-kicker" {...up(0)}>SCHOOL AND OFFICE SUPPLIES</motion.span>
        <Split as="h1" onLoad accent={['space.']} delay={.15} text="The right supplies for every space." />
        <motion.p {...up(1)}>Explore boards, stands, furniture, fire safety and sound systems. Build your quote cart and tell us exactly what you need.</motion.p>
        <motion.a href="#catalog" className="market-primary market-primary--light" {...up(2)}>Shop all products <Icon name="arrow" size={18} /></motion.a>
      </div>
      <PromoArt />
    </div>
  </section>;
}

export default function MarketStore() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState(() => groupFromHash() ?? 'all');
  const [category, setCategory] = useState('All boards');
  const [use, setUse] = useState('All spaces');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState('cart');
  const [selectedProduct, setSelectedProduct] = useState(productFromHash);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toast, setToast] = useState('');
  const still = useStill();
  useEffect(() => {
    const h = document.querySelector('.market-header'); if (!h) return;
    const set = () => document.documentElement.style.setProperty('--mh', h.offsetHeight + 'px');
    set(); const ro = new ResizeObserver(set); ro.observe(h); window.addEventListener('resize', set);
    return () => { ro.disconnect(); window.removeEventListener('resize', set); };
  }, []);
  useEffect(() => {
    document.documentElement.toggleAttribute('data-still', still);
    if (still) return;
    const lenis = new Lenis({ lerp: .08, wheelMultiplier: .92 });
    window.__lenis = lenis; let raf = 0;
    const tick = t => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis; };
  }, [still]);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { const update = () => { setSelectedProduct(productFromHash()); const next = groupFromHash(); if (next) { setGroup(next); setCategory('All boards'); } }; window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update); }, []);
  /* arriving from a "View in shop" link on the main site: go straight to that group's products */
  useEffect(() => { if (!groupFromHash()) return; const timeout = setTimeout(() => document.getElementById('catalog')?.scrollIntoView(), 250); return () => clearTimeout(timeout); }, []);
  useEffect(() => { if (!toast) return; const timeout = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timeout); }, [toast]);
  useEffect(() => { if (!cartOpen) return; const prior = document.body.style.overflow; document.body.style.overflow = 'hidden'; const escape = event => { if (event.key === 'Escape') setCartOpen(false); }; window.addEventListener('keydown', escape); return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', escape); }; }, [cartOpen]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = products.filter(product => (group === 'all' || product.group === group) && (group !== 'boards' || category === 'All boards' || product.category === category) && (use === 'All spaces' || product.uses.includes(use)) && (!term || `${product.name} ${product.category} ${product.summary} ${product.keywords}`.toLowerCase().includes(term)));
    return sort === 'alphabetical' ? [...result].sort((a, b) => a.name.localeCompare(b.name)) : result;
  }, [query, group, category, use, sort]);
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(id, quantity = 1, size = '') {
    const trimmed = size.trim();
    setCart(previous => { const index = previous.findIndex(item => item.id === id && item.size.toLowerCase() === trimmed.toLowerCase()); return index < 0 ? [...previous, { id, quantity, size: trimmed }] : previous.map((item, i) => i === index ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item); });
    setToast(`${byId[id].name} added to quote cart`);
  }
  function openProduct(id) { window.location.hash = `#product/${id}`; setSelectedProduct(id); }
  function backToShop() { window.history.pushState(null, '', window.location.pathname + window.location.search); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function openCart() { setCartStep('cart'); setCartOpen(true); }
  function pickGroup(id) { setGroup(id); setCategory('All boards'); }
  function selectGroup(id) { pickGroup(id); setFiltersOpen(false); if (selectedProduct) backToShop(); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), selectedProduct ? 120 : 0); }
  function clearFilters() { pickGroup('all'); setUse('All spaces'); }
  function updateItem(index, patch) { setCart(previous => previous.map((item, i) => i === index ? { ...item, ...patch } : item)); }

  return <div className="market-site">
    <header className="market-header"><div className="market-container market-header-main"><a className="market-brand" href="/ecommerce/" onClick={event => { if (selectedProduct) { event.preventDefault(); backToShop(); } }}><LogoMark /><span><strong>Paradise Enterprise</strong><small>ONLINE STORE</small></span></a><div className="market-search"><Icon name="search" size={19} /><input type="search" value={query} onChange={event => { setQuery(event.target.value); if (selectedProduct) backToShop(); }} onKeyDown={event => { if (event.key === 'Enter') document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }} placeholder="Search boards, furniture, fire safety, sound..." aria-label="Search products" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" size={16} /></button>}</div><div className="market-header-actions"><a className="market-main-link" href="/">Main website ↗</a><button className="market-cart-button" onClick={openCart}><Icon name="bag" size={21} /><span>Quote cart</span><b>{count}</b></button></div></div><nav className="market-container market-nav" aria-label="Product groups">{groupTabs.map(item => <button key={item.id} className={group === item.id ? 'active' : ''} onClick={() => selectGroup(item.id)}>{item.name}</button>)}<span>Request a quote • No payment required</span></nav></header>

    {selectedProduct ? <ProductPage key={selectedProduct} product={byId[selectedProduct]} onBack={backToShop} onGroup={selectGroup} onAdd={addToCart} onOpen={openProduct} /> : <main>
      <Hero />
      <div className="market-perks market-container"><div><b>01</b><span><strong>Explore the range</strong><small>{products.length} products</small></span></div><div><b>02</b><span><strong>Add your requirements</strong><small>Size and quantity</small></span></div><div><b>03</b><span><strong>Request a quote</strong><small>Our team confirms the details</small></span></div></div>
      <section id="catalog" className="market-catalog market-container"><div className="market-catalog-heading"><div><span className="market-kicker">SHOP THE COLLECTION</span><h2>{group === 'all' ? 'Shop all products' : `Shop ${groupById[group].name.toLowerCase()}`}</h2><p>{group === 'all' ? 'Find what your space needs and request a tailored quote.' : groupById[group].blurb}</p></div><span>{visible.length} product{visible.length === 1 ? '' : 's'}</span></div>
        <div className="market-catalog-layout"><aside className={`market-filters ${filtersOpen ? 'open' : ''}`}><div className="market-filter-head"><strong>Filters</strong><button onClick={clearFilters}>Clear all</button></div><div className="market-filter-group"><h3>Products</h3>{groupTabs.map(item => <button key={item.id} className={group === item.id ? 'selected' : ''} onClick={() => pickGroup(item.id)}><span className="market-radio" />{item.name}<small>{item.id === 'all' ? products.length : productsIn(item.id).length}</small></button>)}</div>{group === 'boards' && <div className="market-filter-group"><h3>Board type</h3>{categories.map(item => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}><span className="market-radio" />{item}<small>{item === 'All boards' ? productsIn('boards').length : productsIn('boards').filter(product => product.category === item).length}</small></button>)}</div>}<div className="market-filter-group"><h3>Shop by space</h3>{uses.map(item => <button key={item} className={use === item ? 'selected' : ''} onClick={() => setUse(item)}><span className="market-radio" />{item}</button>)}</div><div className="market-filter-help"><strong>Need something specific?</strong><p>Add a note when you request your quote.</p></div></aside><div className="market-results"><div className="market-toolbar"><button className="market-mobile-filter" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}>Filters {(group !== 'all' || use !== 'All spaces') && '•'}</button><span>Showing {visible.length} of {products.length} products</span><label>Sort by <select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="alphabetical">Name A–Z</option></select></label></div>{visible.length ? <div className="market-grid">{visible.map(product => <ProductCard key={product.id} product={product} index={visible.indexOf(product)} onOpen={openProduct} onAdd={addToCart} />)}</div> : <div className="market-empty"><h3>No products found</h3><p>Try another search or clear your filters.</p><button className="market-primary" onClick={() => { setQuery(''); clearFilters(); }}>Show all products</button></div>}</div></div>
      </section><section className="market-help market-container"><div><span className="market-kicker">HERE TO HELP</span><h2>Know what you need? Get a quote.</h2><p>Send your selected products, sizes and quantities. We’ll confirm availability, pricing and delivery.</p></div><button className="market-primary" onClick={openCart}>Open quote cart <Icon name="arrow" size={18} /></button></section>
    </main>}
    <footer className="market-footer"><div className="market-container"><div><strong>Paradise Enterprise</strong><p>Boards, furniture, fire safety and sound systems for classrooms, workplaces and institutions.</p></div><div><strong>Explore</strong><button onClick={() => selectGroup('all')}>All products</button><a href="/">Main website</a></div><div><strong>Contact</strong><a href="tel:+919922404078">+91 99224 04078</a><button onClick={openCart}>Request a quote</button></div></div><small>Product illustrations are representative. Specifications, pricing, delivery and payment are confirmed with your quote.</small></footer>
    {cartOpen && <QuoteDrawer items={cart} step={cartStep} onStep={setCartStep} onClose={() => setCartOpen(false)} onQuantity={(index, quantity) => updateItem(index, { quantity })} onSize={(index, size) => updateItem(index, { size })} onRemove={index => setCart(previous => previous.filter((_, i) => i !== index))} onSuccess={() => setCart([])} />}
    {count > 0 && !cartOpen && <button className="market-cartbar" onClick={openCart}><span><b>{count}</b> {count === 1 ? 'item' : 'items'} in your quote</span><strong>View quote cart <Icon name="arrow" size={18} /></strong></button>}
    {toast && <div className="market-toast" role="status">✓ {toast}<button onClick={openCart}>View cart</button></div>}
  </div>;
}
