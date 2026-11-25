import { useState } from 'react';
import { scenes, SurfaceScene } from './scenes';

/* A photo slot. Drop /public/photos/<name>.webp in and it replaces the animated stand-in
   automatically; until then (or if the file fails to load) the stand-in scene shows. */
export default function Slot({ name, alt, scene, surface, ratio = '4 / 3', eager = false, className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const Scene = scene ? scenes[scene] : null;
  return <div className={`slot ${className}`} style={{ aspectRatio: ratio }}>
    {!loaded && (Scene ? <Scene /> : <SurfaceScene kind={surface} />)}
    <img className={loaded ? 'is-loaded' : ''} src={`/photos/${name}.webp`} alt={loaded ? alt : ''} loading={eager ? 'eager' : 'lazy'} decoding="async" onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} />
    {!loaded && <span className="sr-only">{alt}</span>}
  </div>;
}
