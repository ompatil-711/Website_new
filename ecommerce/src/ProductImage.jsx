import { useState } from 'react';
import BoardVisual from './BoardVisual';

/** Product photo from /products/<id>.webp. Falls back to the SVG illustration if the file is missing or fails to load. */
export default function ProductImage({ product, eager = false }) {
  const [failed, setFailed] = useState(false);
  if (failed || !product.image) return <BoardVisual product={product} />;
  return <img className="product-photo" src={product.image} alt={product.name} width="800" height="800" loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}
