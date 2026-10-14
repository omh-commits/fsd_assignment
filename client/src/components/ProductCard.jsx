import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.product_id}`} className="card">
      <img src={product.image_url} alt={product.product_name} loading="lazy" />
      <div className="card-body">
        <h3>{product.product_name}</h3>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="small">
          {product.stock_quantity > 0 ? `In stock: ${product.stock_quantity}` : 'Out of stock'}
        </p>
      </div>
    </Link>
  );
}
