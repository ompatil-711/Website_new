import { useId } from 'react';

export default function BoardVisual({ product, className = '' }) {
  const uid = useId().replaceAll(':', '');
  const type = product.visual;
  const dark = ['green', 'black', 'digital'].includes(type);
  const fill = type === 'green' ? '#155847' : type === 'black' ? '#243333' : type === 'digital' ? '#142759' : type === 'pin' ? '#c8d8e4' : '#fff';
  const ink = dark ? '#f7f5e7' : '#2b6777';
  return <svg className={`board-visual ${className}`} viewBox="0 0 500 350" role="img" aria-label={`${product.name} illustration`}>
    <defs>
      <linearGradient id={`frame-${uid}`} x2="1" y2="1"><stop stopColor="#d5e0eb" /><stop offset=".48" stopColor="#f8fbff" /><stop offset="1" stopColor="#8fa0b4" /></linearGradient>
      <linearGradient id={`shine-${uid}`} x2="1" y2="1"><stop stopColor="#ffffff70" /><stop offset="1" stopColor="#ffffff00" /></linearGradient>
    </defs>
    <ellipse cx="253" cy="305" rx="183" ry="16" fill="#132c5b16" />
    <g transform="rotate(-3 250 175)">
      <rect x="48" y="48" width="404" height="246" rx="9" fill={`url(#frame-${uid})`} stroke="#91a4b8" strokeWidth="2" />
      <rect x="58" y="58" width="384" height="225" rx="3" fill={fill} />
      {type === 'pin' && <g><rect x="78" y="82" width="124" height="150" rx="3" fill="#fffdf5" transform="rotate(-5 140 157)"/><rect x="247" y="105" width="136" height="133" rx="3" fill="#e6eef3" transform="rotate(6 315 170)"/><circle cx="139" cy="86" r="6" fill="#52ab98"/><circle cx="315" cy="109" r="6" fill="#2b6777"/><path d="M99 120h73m-73 16h53m-53 16h68m100-7h84m-84 17h64m-64 17h78" stroke="#d5dce7" strokeWidth="5" strokeLinecap="round"/></g>}
      {type === 'combo' && <g><rect x="60" y="60" width="191" height="221" fill="#fff"/><rect x="251" y="60" width="189" height="221" fill="#c8d8e4"/><path d="M251 59v223" stroke="#a4b2c3" strokeWidth="5"/><path d="M97 124h112m-112 25h81" stroke="#d9e2f1" strokeWidth="7" strokeLinecap="round"/><path d="m95 222 28-28 31 16 46-51" fill="none" stroke="#2b6777" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="284" y="94" width="114" height="131" rx="2" fill="#fffdf5" transform="rotate(4 340 160)"/><circle cx="340" cy="98" r="6" fill="#52ab98"/></g>}
      {type === 'acrylic' && <g><rect x="96" y="77" width="307" height="186" rx="4" fill="#ecf5ff" stroke="#b8cadb" strokeWidth="2"/><path d="M121 115h161m-161 22h120m-120 22h174m-174 22h135m-135 22h164" stroke="#94abd0" strokeWidth="6" strokeLinecap="round"/><path d="M99 80h301l-90 178H99z" fill={`url(#shine-${uid})`}/><circle cx="111" cy="92" r="4" fill="#a7b8c8"/><circle cx="388" cy="92" r="4" fill="#a7b8c8"/></g>}
      {['white', 'ceramic', 'green', 'black'].includes(type) && <g><path d="M104 123h158m-158 27h113" stroke={type === 'ceramic' ? '#a5baff' : ink} strokeWidth="8" strokeLinecap="round" opacity=".72"/><path d="m106 225 45-40 42 22 58-73 38 31 62-68" stroke={type === 'ceramic' ? '#2b6777' : ink} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M333 97h18v18" stroke={type === 'ceramic' ? '#2b6777' : ink} strokeWidth="7" fill="none" strokeLinecap="round"/></g>}
      {type === 'magnetic' && <g><rect x="92" y="96" width="116" height="119" rx="4" fill="#e9f0ff" transform="rotate(-6 150 155)"/><rect x="273" y="111" width="110" height="119" rx="4" fill="#f2f2f2" transform="rotate(6 328 170)"/><circle cx="151" cy="103" r="12" fill="#52ab98"/><circle cx="330" cy="119" r="12" fill="#52ab98"/><path d="M110 138h75m-75 18h60m-60 18h70m111-20h73m-73 18h65m-65 18h74" stroke="#a9b8cb" strokeWidth="5" strokeLinecap="round"/></g>}
      {type === 'key' && <g fill="none" stroke="#2b6777" strokeWidth="7" strokeLinecap="round"><path d="M105 111h285m-285 72h285" stroke="#a5b5ca"/><circle cx="146" cy="142" r="13"/><path d="M146 155v32l12 10m-12-22 14-4"/><circle cx="249" cy="142" r="13"/><path d="M249 155v32l12 10m-12-22 14-4"/><circle cx="352" cy="142" r="13"/><path d="M352 155v32l12 10m-12-22 14-4"/></g>}
      {type === 'drawing' && <g fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M117 229l52-105 51 105z" stroke="#2b6777" strokeWidth="7"/><circle cx="309" cy="170" r="50" stroke="#13aaa7" strokeWidth="7"/><path d="M249 246l78-151m-27 8 26 14" stroke="#52ab98" strokeWidth="7"/><path d="M113 101h104" stroke="#a7b8cd" strokeWidth="5"/></g>}
      {type === 'digital' && <g><path d="M84 93h145m-145 25h103" stroke="#f5f7ff" strokeWidth="7" strokeLinecap="round"/><circle cx="366" cy="129" r="43" fill="#6684ff" opacity=".7"/><circle cx="366" cy="129" r="24" fill="#a6b7ff"/><rect x="86" y="177" width="82" height="68" rx="6" fill="#52ab98"/><rect x="180" y="177" width="82" height="68" rx="6" fill="#52ab98"/><rect x="274" y="177" width="82" height="68" rx="6" fill="#8fa7ff"/></g>}
      <path d="M47 294h407" stroke="#8196ad" strokeWidth="7" strokeLinecap="round" />
      <rect x="331" y="283" width="58" height="10" rx="2" fill="#52ab98" />
    </g>
  </svg>;
}
