/* Animated stand-in scenes. They fill the photo slots until the real photographs
   are dropped into /public/photos/<slot>.webp (see Slot.jsx). Every word is live text. */

const INK = "#12292e";
const BLUE = 'var(--accent)';
const ORANGE = 'var(--cool)';
const AQUA = 'var(--cool)';

function Draw({ d, color = BLUE, w = 6, delay = 0, dur = 4 }) {
  return <path className="draw" d={d} pathLength="1" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={{ '--d': `${delay}s`, '--t': `${dur}s` }} />;
}

function Board({ x: X, y: Y, w: W, h: H, face = '#ffffff', frame = '#d9d6cc', edge = 10, tray = true, children }) {
  const [x, y, w, h] = [X, Y, W, H].map(Number);
  return <g>
    <rect x={x + 6} y={y + 10} width={w} height={h} rx="12" fill="#1a2b5a" opacity=".08" />
    <rect x={x} y={y} width={w} height={h} rx="12" fill={frame} />
    <rect x={x + edge} y={y + edge} width={w - edge * 2} height={h - edge * 2} rx="4" fill={face} />
    {children}
    {tray && <g>
      <rect x={x + w * 0.08} y={y + h - 2} width={w * 0.84} height="14" rx="4" fill="#aab4c3" />
      <rect x={x + w * 0.16} y={y + h - 10} width="46" height="9" rx="4" fill={BLUE} />
      <rect x={x + w * 0.16 + 58} y={y + h - 10} width="46" height="9" rx="4" fill={ORANGE} />
      <rect x={x + w * 0.16 + 116} y={y + h - 10} width="46" height="9" rx="4" fill={AQUA} />
    </g>}
  </g>;
}

export function WallScene() {
  return <svg className="scene" viewBox="0 0 1280 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1280" height="520" fill="var(--paper)" />
    <rect y="468" width="1280" height="52" fill="var(--line)" />
    <rect y="462" width="1280" height="8" fill="var(--line)" />
    <Board x="120" y="48" w="660" h="372">
      <Draw d="M170 340 L260 290 L340 305 L440 215 L540 235 L650 130" color={BLUE} w={8} />
      <Draw d="M630 112 L662 126 L640 156" color={BLUE} w={8} delay=".25" />
      <Draw d="M170 120 q40 -50 80 0 t80 0 t80 0" color={ORANGE} w={7} delay=".6" />
      <Draw d="M190 395 h120 M330 395 h200" color="#9aa4b4" w={5} delay="1.1" />
      <Draw d="M560 340 q30 -50 60 0 q-30 50 -60 0 M575 345 l14 14 l30 -34" color={AQUA} w={7} delay="1.4" />
    </Board>
    <Board x="840" y="86" w="330" h="296" face="#1f6a57" frame="#9b7650" edge={12}>
      <Draw d="M880 150 h210 M880 200 h160 M880 250 h230" color="#eef6f2" w={5} delay=".3" />
      <Draw d="M885 310 q30 -40 60 0 t60 0" color="#ffd9a8" w={5} delay="1" />
      <circle cx="1060" cy="318" r="22" fill="none" stroke="#eef6f2" strokeWidth="5" className="draw" pathLength="1" style={{ '--d': '1.6s', '--t': '4s' }} />
    </Board>
    <rect x="410" y="432" width="300" height="20" rx="6" fill="#cdd5e0" />
    <rect x="430" y="452" width="10" height="20" fill="#bcc5d2" />
    <rect x="680" y="452" width="10" height="20" fill="#bcc5d2" />
    <rect className="sweep" x="-300" y="0" width="260" height="520" fill="url(#sweepGrad)" />
    <defs><linearGradient id="sweepGrad" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient></defs>
  </svg>;
}

export function SurfaceScene({ kind }) {
  const faces = { white: '#ffffff', ceramic: '#f3f8fc', magnetic: '#ffffff', green: '#1f6a57' };
  return <svg className="scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="300" fill="var(--paper)" />
    <Board x="36" y="34" w="328" h="222" face={faces[kind]} frame={kind === 'green' ? '#9b7650' : '#d9d6cc'} edge={9} tray={false}>
      {kind === 'white' && <><Draw d="M70 190 L120 140 L170 160 L230 90 L300 110" color={BLUE} w={6} /><Draw d="M70 90 h80 M70 118 h50" color="#9aa4b4" w={4} delay=".6" /></>}
      {kind === 'ceramic' && <><Draw d="M70 170 q40 -80 80 0 t80 0 t80 0" color={ORANGE} w={6} /><rect className="gloss" x="-120" y="40" width="90" height="210" fill="url(#glossGrad)" /><defs><linearGradient id="glossGrad" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".95" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient></defs></>}
      {kind === 'magnetic' && <g>
        <g className="note n1"><rect x="64" y="70" width="84" height="64" rx="4" fill="#ffe08a" /><circle cx="106" cy="74" r="7" fill={BLUE} /></g>
        <g className="note n2"><rect x="168" y="96" width="84" height="64" rx="4" fill="#bdeee7" /><circle cx="210" cy="100" r="7" fill={ORANGE} /></g>
        <g className="note n3"><rect x="262" y="66" width="76" height="64" rx="4" fill="#ffd2bb" /><circle cx="300" cy="70" r="7" fill={BLUE} /></g>
      </g>}
      {kind === 'green' && <><Draw d="M70 100 h220 M70 140 h160 M70 180 h200" color="#eef6f2" w={4} /><Draw d="M250 140 q20 -30 40 0" color="#ffd9a8" w={4} delay=".9" /></>}
    </Board>
  </svg>;
}

export function InstallScene() {
  return <svg className="scene" viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="480" height="600" fill="var(--paper)" />
    <rect y="540" width="480" height="60" fill="var(--line)" />
    <g className="settle"><Board x="60" y="130" w="360" h="240" tray={false}>
      <Draw d="M100 300 L190 230 L260 260 L340 180" color={BLUE} w={7} />
    </Board></g>
    {[[72, 142], [408, 142], [72, 358], [408, 358]].map(([cx, cy], i) => <circle key={i} className="screw" cx={cx} cy={cy} r="5" fill={INK} style={{ '--d': `${i * 0.25}s` }} />)}
    <g stroke={INK} strokeWidth="1.5" fill="none" opacity=".55"><path d="M60 100 H420 M60 92 v16 M420 92 v16" /><path d="M32 130 V370 M24 130 h16 M24 370 h16" /></g>
    <text x="240" y="90" textAnchor="middle" fontSize="16" fill={INK} opacity=".7">4 ft</text>
    <text x="20" y="256" fontSize="16" fill={INK} opacity=".7" transform="rotate(-90 20 256)" textAnchor="middle">3 ft</text>
    <g transform="translate(120 420)"><rect width="240" height="34" rx="8" fill="var(--cool)" /><rect x="96" y="7" width="48" height="20" rx="10" fill="#fff" /><circle className="bubble" cx="120" cy="17" r="7" fill={AQUA} /></g>
  </svg>;
}

export function RoomScene() {
  const desk = (x, y, s) => <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect width="150" height="16" rx="4" fill="#d9b88f" /><rect x="10" y="16" width="8" height="46" fill="#9aa4b4" /><rect x="132" y="16" width="8" height="46" fill="#9aa4b4" />
    <rect x="44" y="30" width="62" height="12" rx="4" fill="var(--cool)" /><rect x="52" y="42" width="6" height="30" fill="#7e8aa0" /><rect x="92" y="42" width="6" height="30" fill="#7e8aa0" />
  </g>;
  return <svg className="scene" viewBox="0 0 1280 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1280" height="560" fill="var(--paper)" />
    <rect y="470" width="1280" height="90" fill="#d9dee8" />
    <rect x="160" y="40" width="130" height="18" rx="6" fill="#fff" /><rect x="575" y="40" width="130" height="18" rx="6" fill="#fff" /><rect x="990" y="40" width="130" height="18" rx="6" fill="#fff" />
    <g className="beams" opacity=".5"><polygon points="1030,90 1280,60 1280,420 1130,420" fill="#fff" /></g>
    <Board x="330" y="86" w="620" h="270" face="#1f6a57" frame="#9b7650" edge={12}>
      <Draw d="M380 160 h300 M380 215 h220 M380 270 h340" color="#eef6f2" w={5} />
      <Draw d="M740 150 L790 230 L840 150 M740 280 h110" color="#ffd9a8" w={5} delay=".8" />
    </Board>
    {desk(150, 400, 1)}{desk(490, 400, 1)}{desk(830, 400, 1)}
    {desk(60, 450, 1.1)}{desk(400, 450, 1.1)}{desk(740, 450, 1.1)}{desk(1070, 450, 1.1)}
  </svg>;
}

export function MeasureScene() {
  return <svg className="scene" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="600" height="480" fill="var(--paper)" />
    <rect y="400" width="600" height="80" fill="var(--line)" />
    <rect x="70" y="150" width="460" height="210" rx="8" fill="#fff" stroke="#d9d6cc" strokeWidth="10" />
    <path className="cut" d="M300 140 V370" stroke={ORANGE} strokeWidth="4" strokeDasharray="10 8" />
    <g stroke={INK} strokeWidth="1.5" fill="none" opacity=".55"><path d="M70 110 H530 M70 102 v16 M530 102 v16" /></g>
    <text x="300" y="98" textAnchor="middle" fontSize="18" fill={INK} opacity=".7">Cut to your wall</text>
    <rect x="110" y="360" width="14" height="50" fill="#9aa4b4" /><rect x="476" y="360" width="14" height="50" fill="#9aa4b4" />
    <Draw d="M110 300 L200 240 L280 270 L380 190" color={BLUE} w={7} />
  </svg>;
}

export function QuoteScene() {
  return <svg className="scene" viewBox="0 0 600 375" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="600" height="375" fill="var(--paper)" />
    <g className="settle2"><rect x="170" y="36" width="260" height="310" rx="10" fill="#fff" stroke="var(--line)" strokeWidth="3" />
      <rect x="170" y="36" width="260" height="46" rx="10" fill="var(--deep)" />
      <text x="192" y="66" fontSize="18" fontWeight="700" fill="#fff">Quote</text>
      <Draw d="M196 120 h170" color={INK} w={6} />
      <Draw d="M196 152 h120" color={INK} w={6} delay=".4" />
      <Draw d="M196 184 h150" color={INK} w={6} delay=".8" />
      <rect x="196" y="236" width="208" height="64" rx="8" fill="var(--paper)" />
      <text x="212" y="278" fontSize="30" fontWeight="700" fill="var(--deep)">₹ ———</text>
      <circle cx="388" cy="268" r="20" fill={AQUA} />
      <Draw d="M378 268 l8 8 l14 -17" color="#fff" w={5} delay="1.2" />
    </g>
  </svg>;
}

export function CheckScene() {
  return <svg className="scene" viewBox="0 0 600 375" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="600" height="375" fill="var(--paper)" />
    <rect y="320" width="600" height="55" fill="var(--line)" />
    <Board x="120" y="50" w="360" h="220" tray={false}>
      <Draw d="M160 200 L230 150 L290 175 L360 110 L430 128" color={BLUE} w={7} />
    </Board>
    <g transform="translate(180 292)"><rect width="240" height="30" rx="8" fill="var(--cool)" /><rect x="96" y="6" width="48" height="18" rx="9" fill="#fff" /><circle className="bubble" cx="120" cy="15" r="6" fill="var(--deep)" /></g>
    <circle cx="470" cy="76" r="34" fill="var(--cool)" />
    <Draw d="M453 76 l12 13 l22 -28" color="#fff" w={7} delay=".6" />
  </svg>;
}

export const scenes = { wall: WallScene, install: InstallScene, room: RoomScene, workshop: MeasureScene, quote: QuoteScene, check: CheckScene };
