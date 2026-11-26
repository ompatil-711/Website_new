/** Flat SVG stand-ins for the non-board products. A real photo in public/products/<id>.webp replaces them. */
const DEEP = '#2b6777', COOL = '#52ab98', MIST = '#c8d8e4', PALE = '#eef3f6', RED = '#c4453a', RED_DARK = '#9d342c';

const line = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

const cylinder = (x, y, w, h, fill = RED) => <g>
  <rect x={x + w * .34} y={y - 22} width={w * .32} height="26" rx="4" fill={DEEP} />
  <rect x={x} y={y} width={w} height={h} rx={w * .36} fill={fill} />
  <rect x={x + w * .16} y={y + h * .12} width={w * .14} height={h * .72} rx={w * .07} fill="#ffffff" opacity=".28" />
</g>;

const speaker = x => <g>
  <rect x={x} y="70" width="126" height="226" rx="14" fill={DEEP} />
  <circle cx={x + 63} cy="128" r="28" fill={MIST} /><circle cx={x + 63} cy="128" r="11" fill={DEEP} />
  <circle cx={x + 63} cy="222" r="48" fill={MIST} /><circle cx={x + 63} cy="222" r="30" fill={COOL} /><circle cx={x + 63} cy="222" r="11" fill={DEEP} />
</g>;

const art = {
  tripod: <g {...line}>
    <path d="M250 70 150 305M250 70 350 305M250 70v225" stroke={DEEP} strokeWidth="11" />
    <rect x="130" y="82" width="240" height="140" rx="6" fill="#ffffff" stroke={MIST} strokeWidth="10" />
    <path d="M168 128h130m-130 28h86" stroke={COOL} strokeWidth="8" />
    <path d="M122 232h256" stroke={DEEP} strokeWidth="11" />
  </g>,
  fourleg: <g {...line}>
    <path d="M150 220 118 305M350 220l32 85M185 220l-8 85M315 220l8 85" stroke={DEEP} strokeWidth="11" />
    <rect x="112" y="60" width="276" height="162" rx="6" fill="#ffffff" stroke={MIST} strokeWidth="10" />
    <path d="M152 108h148m-148 30h104m-104 30h128" stroke={COOL} strokeWidth="8" />
    <path d="M104 228h292M165 268h170" stroke={DEEP} strokeWidth="10" />
  </g>,
  bench: <g {...line}>
    <path d="M100 160v140M400 160v140M138 232v68M362 232v68M100 268h300" stroke={DEEP} strokeWidth="11" />
    <rect x="76" y="142" width="348" height="30" rx="7" fill={COOL} />
    <rect x="104" y="178" width="292" height="26" rx="5" fill={MIST} />
    <rect x="96" y="226" width="308" height="22" rx="7" fill={COOL} />
  </g>,
  table: <g>
    <rect x="70" y="116" width="360" height="28" rx="7" fill={COOL} />
    <rect x="90" y="144" width="14" height="158" fill={DEEP} /><rect x="268" y="144" width="14" height="158" fill={DEEP} />
    <rect x="282" y="144" width="130" height="158" rx="4" fill={MIST} />
    {[160, 206, 252].map(y => <g key={y}><rect x="294" y={y} width="106" height="36" rx="4" fill="#ffffff" /><rect x="330" y={y + 15} width="34" height="6" rx="3" fill={DEEP} /></g>)}
    <rect x="104" y="170" width="164" height="12" fill={DEEP} />
  </g>,
  bookcase: <g>
    <rect x="132" y="46" width="236" height="258" rx="8" fill={DEEP} />
    <rect x="146" y="60" width="208" height="230" fill={PALE} />
    {[136, 212].map(y => <rect key={y} x="146" y={y} width="208" height="10" fill={DEEP} />)}
    {[[160, 76, 22, 60, COOL], [186, 86, 18, 50, MIST], [208, 72, 24, 64, DEEP], [238, 82, 20, 54, COOL], [300, 78, 22, 58, MIST], [168, 160, 26, 52, DEEP], [198, 154, 18, 58, MIST], [262, 166, 24, 46, COOL], [290, 156, 20, 56, DEEP], [314, 164, 22, 48, MIST], [158, 236, 60, 54, MIST], [232, 240, 22, 50, COOL], [258, 232, 20, 58, DEEP], [282, 244, 56, 46, COOL]].map(([x, y, w, h, f]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="2" fill={f} />)}
  </g>,
  chair: <g {...line}>
    <path d="M180 200v102M318 200v102M205 200l-4 78M296 200l4 78M180 200 176 62" stroke={DEEP} strokeWidth="12" />
    <rect x="162" y="62" width="30" height="96" rx="10" fill={COOL} />
    <rect x="166" y="184" width="176" height="28" rx="10" fill={COOL} />
    <path d="M182 266h134" stroke={DEEP} strokeWidth="8" />
  </g>,
  podium: <g>
    <path d="M168 128h164l-22 164H190z" fill={DEEP} />
    <path d="M146 98 354 78l8 34-224 22z" fill={COOL} />
    <rect x="158" y="288" width="184" height="18" rx="5" fill={DEEP} />
    <circle cx="250" cy="206" r="32" fill={MIST} /><path d="M236 206l10 11 20-23" {...line} stroke={DEEP} strokeWidth="8" />
    <path d="M300 84c0-30 10-42 28-48" {...line} stroke={DEEP} strokeWidth="6" /><rect x="322" y="24" width="26" height="18" rx="9" fill={DEEP} transform="rotate(-18 335 33)" />
  </g>,
  extinguisher: <g>
    {cylinder(196, 106, 108, 198)}
    <path d="M232 84h-42m60-4 58-18" {...line} stroke={DEEP} strokeWidth="11" />
    <path d="M268 90c76 6 72 62 66 116" {...line} stroke={DEEP} strokeWidth="9" />
    <path d="m322 204 26 2 6 34-38-4z" fill={DEEP} />
    <rect x="212" y="164" width="76" height="82" rx="6" fill="#ffffff" />
    <path d="M250 180c18 18 20 28 14 38-4 8-24 8-28 0-6-10-2-20 14-38z" fill={RED} />
  </g>,
  fireball: <g>
    <circle cx="250" cy="176" r="116" fill={RED} />
    <path d="M142 214c62 34 154 34 216 0" {...line} stroke={RED_DARK} strokeWidth="10" />
    <ellipse cx="208" cy="122" rx="34" ry="20" fill="#ffffff" opacity=".3" transform="rotate(-32 208 122)" />
    <circle cx="250" cy="180" r="46" fill="#ffffff" />
    <path d="M250 148c24 24 26 38 18 50-6 10-30 10-36 0-8-12-2-28 18-50z" fill={RED} />
  </g>,
  cylinders: <g>
    {cylinder(112, 130, 80, 174, RED_DARK)}
    {cylinder(210, 90, 80, 214)}
    {cylinder(308, 130, 80, 174, RED_DARK)}
    <rect x="96" y="296" width="308" height="12" rx="6" fill={DEEP} />
  </g>,
  bucket: <g>
    <path d="M150 130c0-108 200-108 200 0" {...line} stroke={DEEP} strokeWidth="9" />
    <path d="M136 130h228l-34 170H170z" fill={RED} />
    <rect x="124" y="118" width="252" height="24" rx="12" fill={RED_DARK} />
    <text x="250" y="235" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="56" fill="#ffffff">FIRE</text>
  </g>,
  amplifier: <g>
    <rect x="70" y="108" width="360" height="164" rx="14" fill={DEEP} />
    <rect x="92" y="130" width="316" height="58" rx="8" fill={PALE} />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <rect key={i} x={112 + i * 18} y={172 - [14, 24, 32, 20, 28, 36, 22, 16, 26][i]} width="10" height={[14, 24, 32, 20, 28, 36, 22, 16, 26][i]} rx="3" fill={COOL} />)}
    <circle cx="368" cy="159" r="12" fill={COOL} />
    {[130, 200, 270, 340].map(x => <g key={x}><circle cx={x} cy="230" r="24" fill={MIST} /><path d={`M${x} 230l10-16`} {...line} stroke={DEEP} strokeWidth="6" /></g>)}
    <rect x="102" y="272" width="46" height="18" rx="5" fill={DEEP} /><rect x="352" y="272" width="46" height="18" rx="5" fill={DEEP} />
  </g>,
  speakers: <g>{speaker(98)}{speaker(276)}</g>,
  mic: <g transform="rotate(28 250 175)">
    <rect x="224" y="140" width="52" height="162" rx="22" fill={DEEP} />
    <circle cx="250" cy="102" r="54" fill={MIST} />
    <path d="M204 82h92m-96 24h100m-92 24h84M228 54v96m22-100v104m22-100v96" {...line} stroke={DEEP} strokeWidth="3" opacity=".45" />
    <rect x="220" y="140" width="60" height="18" rx="6" fill={COOL} />
    <rect x="243" y="190" width="14" height="40" rx="7" fill={COOL} />
  </g>,
};

export default function ItemVisual({ product, className = '' }) {
  return <svg className={`board-visual ${className}`} viewBox="0 0 500 350" role="img" aria-label={`${product.name} illustration`}>
    <ellipse cx="250" cy="308" rx="170" ry="14" fill="#132c5b16" />
    {art[product.visual]}
  </svg>;
}
