// Page 3 of 6: the cart (needs login)

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJSON, postJSON } from '../api';
import { useAuth } from '../AuthContext.jsx';
import LoginNotice from '../components/LoginNotice.jsx';
import { formatPrice } from '../utils';

export default function CartPage() {
  const { user, checking, refreshCart } = useAuth();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadCart() {
    try {
      const data = await getJSON('/cart');
      setCart(data.cart);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) loadCart();
  }, [user]);

  async function handleRemove(productId) {
    setMessage('');
    setError('');
    try {
      const data = await postJSON(`/remove_from_cart/${productId}`);
      setMessage(data.message);
      await loadCart();
      refreshCart();
    } catch (err) {
      setError(err.message);
    }
  }

  if (checking) return <p>Loading...</p>;
  if (!user) return <LoginNotice text="Please log in to view your cart." next="/cart" />;

  return (
    <div>
      <h1>Your cart</h1>

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
      {loading && <p>Loading cart...</p>}

      {!loading && cart.length === 0 && (
        <div className="box">
          <p>Your cart is empty!</p>
          <Link className="button" to="/">
            Go shopping
          </Link>
        </div>
      )}

      {!loading && cart.length > 0 && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product_id}>
                  <td data-label="Product">
                    <Link to={`/product/${item.product_id}`} className="cart-product">
                      <img src={item.image_url} alt="" />
                      {item.product_name}
                    </Link>
                  </td>
                  <td data-label="Price">{formatPrice(item.price)}</td>
                  <td data-label="Quantity">{item.quantity}</td>
                  <td data-label="Total">{formatPrice(item.total_price)}</td>
                  <td>
                    <button type="button" className="button-secondary" onClick={() => handleRemove(item.product_id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-footer">
            <p className="price big">Total: {formatPrice(total)}</p>
            <Link className="button" to="/checkout">
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
