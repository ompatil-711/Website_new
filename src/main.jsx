import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import MotionPreferences from './components/MotionPreferences';
import './styles/professional.css';
import './styles/expressive.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><MotionPreferences><App /></MotionPreferences></React.StrictMode>);
