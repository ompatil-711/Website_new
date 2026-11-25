import React from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import Site from './site/Site';

createRoot(document.getElementById('root')).render(<React.StrictMode><MotionConfig reducedMotion="never"><Site /></MotionConfig></React.StrictMode>);
