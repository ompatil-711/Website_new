export default function Particles() {
  return <div className="hero-particles" aria-hidden="true">{Array.from({ length: 30 }, (_, i) => <div key={i} className="particle" style={{ left: `${(i * 37) % 100}%`, bottom: 0, '--dur': `${4 + i % 8}s`, '--delay': `${i % 6}s`, width: `${1 + i % 3}px`, height: `${1 + i % 3}px` }} />)}</div>;
}
