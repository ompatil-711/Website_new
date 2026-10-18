import { useEffect, useRef, useState } from 'react';
import { useSiteReducedMotion } from './MotionPreferences';

export default function Counter({ target }) {
  const reduced = useSiteReducedMotion();
  const element = useRef(null);
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (reduced) { setValue(target); return; }
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / 1600, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(element.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [target, reduced]);
  return <span ref={element} className="count" aria-label={String(target)}><span aria-hidden="true">{value}</span></span>;
}
