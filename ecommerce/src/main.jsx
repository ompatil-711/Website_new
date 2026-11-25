import React from 'react';
import { createRoot } from 'react-dom/client';
import MarketStore from './MarketStore';
import './store.css';
import './market.css';
import './quote.css';
import './shop-theme.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><MarketStore /></React.StrictMode>);
