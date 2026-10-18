import { useState } from 'react';
import PageEntrance from './components/BoardEntrance';
import { useSiteReducedMotion } from './components/MotionPreferences';
import ScrollProgress from './components/ScrollProgress';
import ProjectCTA from './components/ProjectCTA';
import Navigation from './components/Navigation';
import Hero from './components/ModernHero';
import ProductTicker from './components/ProductTicker';
import BoardMoment from './components/BoardMoment';
import Story from './components/Story';
import Founders from './components/Founders';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import Clients from './components/Clients';
import Services from './components/Services';
import Contact from './components/Contact';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useMotionReveal';
import useSmoothScroll from './hooks/useSmoothScroll';

export default function App() {
  const [interest, setInterest] = useState({ category: '' });
  const reduced = useSiteReducedMotion();
  useScrollReveal();
  useSmoothScroll();
  function enquire(category) {
    setInterest({ category });
    document.getElementById('contact').scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
    document.getElementById('enquiry-name').focus({ preventScroll: true });
  }
  return <>
    <PageEntrance />
    <ScrollProgress />
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">
      <Hero /><ProductTicker />
      <Products onEnquire={enquire} /><BoardMoment /><Clients /><WhyChooseUs /><Services />
      <Story /><Founders />
      <ProjectCTA /><Contact interest={interest} /><LocationMap />
    </main>
    <Footer />
  </>;
}
