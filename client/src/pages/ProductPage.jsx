// Page 2 of 6: one product with its details, steps to grow and "Add to cart"

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJSON, postJSON } from '../api';
import { useAuth } from '../AuthContext.jsx';
import { formatPrice, splitSteps } from '../utils';

export default function ProductPage() {
  const { id } = useParams();
  const { user, refreshCart } = useAuth();

  const [product, setProduct] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setProduct(null);
    setLoadError('');
    setMessage('');
    setError('');
    setQuantity(1);
    getJSON(`/product/${id}`)
      .then((data) => setProduct(data.product))
      .catch((err) => setLoadError(err.message));
  }, [id]);

  async function handleAddToCart(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setAdding(true);
    try {
      const data = await postJSON('/add_to_cart', { product_id: product.product_id, quantity });
      setMessage(data.message);
      refreshCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  if (loadError) {
    return (
      <p className="message error">
        {loadError} <Link to="/">Back to the shop</Link>
      </p>
    );
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  const outOfStock = product.stock_quantity <= 0;
  const backLink = `/?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subcategory)}`;

  return (
    <div>
      <p className="small">
        <Link to="/">Shop</Link> / <Link to={backLink}>{product.subcategory}</Link> / {product.product_name}
      </p>

      <div className="product-layout">
        <img className="product-image" src={product.image_url} alt={product.product_name} />

        <div className="product-info">
          <h1>{product.product_name}</h1>
          <p className="price big">{formatPrice(product.price)}</p>
          <p>{product.description}</p>

          {product.steps_to_grow && (
            <>
              <h2>Steps to grow</h2>
              <ol>
                {splitSteps(product.steps_to_grow).map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </>
          )}

          <p className={outOfStock ? 'stock out' : 'stock'}>
            {outOfStock ? 'Out of stock' : `In stock: ${product.stock_quantity}`}
          </p>

          <form className="add-form" onSubmit={handleAddToCart}>
            <label>
              Quantity{' '}
              <input
                type="number"
                min="1"
                max={product.stock_quantity}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                disabled={outOfStock}
              />
            </label>
            <button type="submit" disabled={outOfStock || adding}>
              {adding ? 'Adding...' : 'Add to cart'}
            </button>
          </form>

          {message && (
            <p className="message success">
              {message} <Link to="/cart">Go to cart</Link>
            </p>
          )}
          {error && (
            <p className="message error">
              {error}{' '}
              {!user && <Link to={`/account?next=${encodeURIComponent(`/product/${product.product_id}`)}`}>Log in</Link>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
