import { useEffect, useState } from 'react';
import { useStill } from './motion';
import Lenis from 'lenis';
import Hero from './Hero';
import { Header, Marquee, Range, Process, Rooms, PriceIt, About, Faq, Quote, Footer } from './sections';
import './site.css';

const categoryFor = p => p.id === 'digital' ? 'Digital Panels' : p.category === 'Writing boards' ? 'Writing Boards' : 'Notice Boards';

export default function Site() {
  const [prefill, setPrefill] = useState(null); const still = useStill();
  useEffect(() => { document.documentElement.toggleAttribute('data-still', still); }, [still]);
  useEffect(() => {
    if (still) return;
    const lenis = new Lenis({ lerp: .07, wheelMultiplier: .9, anchors: { offset: -84 } });
    window.__lenis = lenis; let raf = 0;
    const tick = t => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis; };
  }, [still]);
  const quote = (text, product) => {
    setPrefill({ text, category: categoryFor(product) });
    const t = document.getElementById('contact');
    window.__lenis ? window.__lenis.scrollTo(t, { offset: -84 }) : t?.scrollIntoView({ behavior: 'smooth' });
  };
  return <>
    <Header />
    <main id="main"><Hero /><Marquee /><Range /><Process /><Rooms /><PriceIt onQuote={quote} /><About /><Faq /><Quote prefill={prefill} /></main>
    <Footer />
  </>;
}
