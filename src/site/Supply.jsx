import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Arrow, Reveal, Split, ease } from './motion';
import ProductImage from '../../ecommerce/src/ProductImage';
import { groups, productsIn } from '../../ecommerce/src/products';

/* one tile per product group; hovering, focusing or tapping a product name swaps the picture */
function Tile({ group, index, onQuote }) {
  const list = productsIn(group.id);
  const [pick, setPick] = useState(0);
  const current = list[pick];
  return <Reveal className={`stile stile--${group.id}`} delay={(index % 3) * .08}>
    <div className="stile__art">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={current.id} className="stile__pic" initial={{ opacity: 0, y: 24, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: .96 }} transition={{ duration: .28, ease }}>
          <ProductImage product={current} />
        </motion.div>
      </AnimatePresence>
      <a className="stile__name" href={`/ecommerce/#product/${current.id}`}>{current.name} <Arrow /></a>
    </div>
    <div className="stile__body">
      <h3>{group.name} <small>{list.length}</small></h3>
      <p>{group.blurb}</p>
      <ul className="stile__items">
        {list.map((item, i) => <li key={item.id}><button type="button" className={i === pick ? 'is-on' : ''} aria-pressed={i === pick} onPointerEnter={e => { if (e.pointerType === 'mouse') setPick(i); }} onFocus={() => setPick(i)} onClick={() => setPick(i)}>{item.name}</button></li>)}
      </ul>
      <div className="stile__actions">
        <a className="btn btn--ghost btn--sm" href={`/ecommerce/#group/${group.id}`}>View in shop</a>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => onQuote(`I would like a quote for: ${current.name}.`, current)}>Ask for a quote <Arrow /></button>
      </div>
    </div>
  </Reveal>;
}

export default function Supply({ onQuote }) {
  return <section className="section section--paper supply" id="products">
    <div className="wrap">
      <div className="head"><span className="label label--sec"><b>01</b>Our products</span><Split text="What we supply." accent={['supply.']} /><p className="lead">Everything a classroom, office or institution needs, from one team in Nagpur.</p></div>
      <div className="supply__grid">{groups.map((group, i) => <Tile key={group.id} group={group} index={i} onQuote={onQuote} />)}</div>
    </div>
  </section>;
}
