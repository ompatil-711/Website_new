import { useEffect, useRef, useState } from 'react';

const links = [['hero', 'Home'], ['products', 'Products'], ['service', 'Services'], ['story', 'About Us'], ['clients', 'Clients'], ['contact', 'Request a Quote']];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const menu = useRef(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current.querySelector('a').focus();
    function keyboard(event) {
      if (event.key === 'Escape') { setOpen(false); toggle.current.focus(); }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...menu.current.querySelectorAll('a')];
        const index = items.indexOf(document.activeElement);
        event.preventDefault();
        items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    }
    const viewport = window.matchMedia('(min-width: 769px)');
    const resize = () => { if (viewport.matches) setOpen(false); };
    viewport.addEventListener('change', resize);
    document.addEventListener('keydown', keyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keyboard);
      viewport.removeEventListener('change', resize);
    };
  }, [open]);
  return <>
    <nav id="navbar" className={scrolled ? 'scrolled' : ''} aria-label="Main navigation">
      <a href="#hero" className="nav-logo" onClick={() => setOpen(false)}>
        <div className="nav-logo-emblem" aria-hidden="true" />
        <div className="nav-logo-text"><span>Paradise Enterprise</span><span>Est. 2001 · Nagpur</span></div>
      </a>
      <ul className="nav-links">{links.slice(1).map(([id, label]) => <li key={id}><a href={'#' + id} className={id === 'contact' ? 'nav-cta' : undefined}>{label}</a></li>)}</ul>
      <button ref={toggle} type="button" className="nav-hamburger" aria-expanded={open} aria-controls="mobileMenu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    </nav>
    <div ref={menu} className={'mobile-menu' + (open ? ' open' : '')} id="mobileMenu" role="navigation" aria-label="Mobile navigation">
      {links.map(([id, label]) => <a key={id} href={'#' + id} onClick={() => { setOpen(false); document.getElementById(id)?.scrollIntoView(); }}>{label}</a>)}
    </div>
  </>;
}
