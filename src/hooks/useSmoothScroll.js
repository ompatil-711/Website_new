import { useEffect } from 'react';
import { useSiteReducedMotion } from '../components/MotionPreferences';

/** Ease desktop wheel input while keeping native controls and scroll boundaries responsive. */
export default function useSmoothScroll() {
  const reduced = useSiteReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    let target = window.scrollY;
    let current = window.scrollY;
    let written = window.scrollY;
    let lastTime = 0;
    const maximum = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      current = target = written = window.scrollY;
    }
    function tick(time) {
      const elapsed = lastTime ? Math.min(time - lastTime, 40) : 16.67;
      lastTime = time;
      target = Math.max(0, Math.min(target, maximum()));
      current += (target - current) * (1 - Math.exp(-elapsed / 105));
      const finished = Math.abs(target - current) < 1;
      if (finished) current = target;
      window.scrollTo({ top: current, behavior: 'instant' });
      written = window.scrollY;
      if (!finished) frame = requestAnimationFrame(tick);
      else { frame = 0; lastTime = 0; }
    }
    function wheel(event) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || document.body.style.overflow === 'hidden') { stop(); return; }
      const delta = event.deltaY * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (!delta) return;
      const element = event.target instanceof Element ? event.target : null;
      if (element?.closest('input, select, iframe, [data-native-scroll]')) { stop(); return; }
      for (let parent = element; parent && parent !== document.body; parent = parent.parentElement) {
        const overflow = getComputedStyle(parent).overflowY;
        const room = parent.scrollHeight - parent.clientHeight;
        if (/auto|scroll/.test(overflow) && room > 1) {
          const canScroll = delta > 0 ? parent.scrollTop < room - 1 : parent.scrollTop > 1;
          if (canScroll) { stop(); return; }
        }
      }
      if (!frame) current = target = written = window.scrollY;
      // Reversing direction should respond immediately, even near the page boundary.
      if (frame && Math.sign(delta) !== Math.sign(target - current)) target = current;
      target = Math.max(0, Math.min(target + delta, maximum()));
      if (!frame && Math.abs(target - current) < 1) return;
      event.preventDefault();
      if (!frame) frame = requestAnimationFrame(tick);
    }
    function nativeScroll() {
      // A scrollbar drag, browser navigation or native control takes precedence over easing.
      if (frame && Math.abs(window.scrollY - written) > 2) stop();
    }
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('scroll', nativeScroll, { passive: true });
    window.addEventListener('pointerdown', stop, { passive: true });
    window.addEventListener('keydown', stop);
    window.addEventListener('resize', stop);
    document.addEventListener('click', stop, true);
    return () => {
      stop();
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('scroll', nativeScroll);
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('keydown', stop);
      window.removeEventListener('resize', stop);
      document.removeEventListener('click', stop, true);
    };
  }, [reduced]);
}
