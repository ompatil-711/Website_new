import { useRef, useState } from 'react';
import AnimatedBoard from './AnimatedBoard';

export default function BoardPlayground() {
  const [green, setGreen] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [run, setRun] = useState(0);
  const active = useRef(null);
  const surface = useRef(null);
  function point(event) {
    const svg = surface.current.querySelector('svg');
    const position = svg.createSVGPoint();
    position.x = event.clientX; position.y = event.clientY;
    return position.matrixTransform(svg.getScreenCTM().inverse());
  }
  function start(event) {
    if (event.button !== 0 || active.current !== null) return;
    const p = point(event);
    if (p.x < 24 || p.x > 336 || p.y < 24 || p.y > 170) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    active.current = event.pointerId;
    setStrokes(previous => [...previous.slice(-79), `M${p.x},${p.y}l.1,.1`]);
  }
  function draw(event) {
    if (active.current !== event.pointerId) return;
    const p = point(event);
    setStrokes(previous => previous.map((stroke, index) => index === previous.length - 1 ? `${stroke} L${Math.max(25, Math.min(335, p.x))},${Math.max(25, Math.min(169, p.y))}` : stroke));
  }
  function stop() { active.current = null; }
  function reset() { stop(); setStrokes([]); }
  return <div className="mosaic-main board-playground">
    <div className="mosaic-label"><span>YOUR IDEAS START HERE</span><span>TRY IT OUT ↙</span></div>
    <div className="board-toolbar" role="group" aria-label="Choose a writing surface">
      <button type="button" aria-pressed={!green} onClick={() => { setGreen(false); reset(); }}><i />Whiteboard</button>
      <button type="button" aria-pressed={green} onClick={() => { setGreen(true); reset(); }}><i />Greenboard</button>
    </div>
    <div className="board-drawing-surface" ref={surface} onPointerDown={start} onPointerMove={draw} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop} aria-label="Draw on the board with your mouse or finger">
      <AnimatedBoard green={green} run={run}>{strokes.map((stroke, index) => <path key={index} d={stroke} fill="none" stroke={green ? '#fffce5' : '#3454ed'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />)}</AnimatedBoard>
    </div>
    <div className="board-play-footer"><span>✎ Draw your next big idea</span><div><button type="button" onClick={() => { reset(); setRun(value => value + 1); }}>Replay</button><button type="button" onClick={reset}>Erase</button><a href="#products" aria-label="Explore writing boards">Explore ↗</a></div></div>
  </div>;
}
