import { useSiteReducedMotion } from '../components/MotionPreferences';
import { useEffect } from 'react';
import { animate, inView } from 'framer-motion';

export default function useMotionReveal() {
  const reduced = useSiteReducedMotion();
  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal, .reveal-left, .reveal-right')];
    const animations = [];
    elements.forEach(element => { element.style.opacity = reduced ? '1' : '0'; });
    if (reduced) return;
    const stop = inView(elements, element => {
      const delay = Math.min([...element.parentElement.children].indexOf(element) * .055, .2);
      const direction = element.classList.contains('reveal-left') ? -24 : element.classList.contains('reveal-right') ? 24 : 0;
      animations.push(animate(element, { opacity: [0, 1], transform: [`translate(${direction}px, 30px)`, 'translate(0px, 0px)'] }, { duration: .85, delay, ease: [.22, 1, .36, 1] }));
    }, { amount: .08 });
    const revealFocused = event => {
      const container = event.target.closest('.reveal, .reveal-left, .reveal-right');
      if (container) { container.style.opacity = '1'; }
    };
    document.addEventListener('focusin', revealFocused);
    return () => { stop(); document.removeEventListener('focusin', revealFocused); animations.forEach(animation => animation.stop()); elements.forEach(element => { element.style.opacity = ''; element.style.transform = ''; }); };
  }, [reduced]);
}

