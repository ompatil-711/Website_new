import { createContext, useContext, useLayoutEffect } from 'react';
import { MotionConfig } from 'framer-motion';

const MotionPreference = createContext(false);
export const useSiteReducedMotion = () => useContext(MotionPreference);

export default function MotionPreferences({ children }) {
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = 'full';
  }, []);
  return <MotionPreference.Provider value={false}>
    <MotionConfig reducedMotion="never">
      {children}
    </MotionConfig>
  </MotionPreference.Provider>;
}

