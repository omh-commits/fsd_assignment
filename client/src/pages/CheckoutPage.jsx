// Page 4 of 6: checkout (needs login)
// Shipping address + payment method, then shows the order confirmation.
// Payment methods: Cash on Delivery or Card. There is no UPI option.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJSON, postJSON } from '../api';
import { useAuth } from '../AuthContext.jsx';
import LoginNotice from '../components/LoginNotice.jsx';
import OrderItems from '../components/OrderItems.jsx';
import { formatPrice } from '../utils';

const EMPTY_CARD = { number: '', expiry: '', cvv: '', name: '' };

export default function CheckoutPage() {
  const { user, checking, refreshCart } = useAuth();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [card, setCard] = useState(EMPTY_CARD);
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null); // filled in after the order is placed

  // Load the cart and the saved address
  useEffect(() => {
    if (!user) return;
    Promise.all([getJSON('/cart'), getJSON('/my_account')])
      .then(([cartData, accountData]) => {
        setCart(cartData.cart);
        setTotal(cartData.total);
        setAddress(accountData.user.address || '');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  function updateCard(field, value) {
    setCard({ ...card, [field]: value });
  }

  // Same checks as the old payment_details.html form. Returns an error message or ''.
  function checkCard() {
    const number = card.number.replace(/\s/g, '');
    if (!/^\d{16}$/.test(number)) return 'Card number must be 16 digits.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) return 'Expiry date must be in MM/YY format.';
    if (!/^\d{3,4}$/.test(card.cvv)) return 'CVV must be 3 or 4 digits.';
    if (card.name.trim() === '') return 'Cardholder name is required.';
    return '';
  }

  async function handlePlaceOrder(event) {
    event.preventDefault();
    setError('');

    if (address.trim() === '') {
      setError('Please enter a shipping address.');
      return;
    }

    let cardLast4 = null;
    if (paymentMethod === 'Card') {
      const cardError = checkCard();
      if (cardError) {
        setError(cardError);
        return;
      }
      // Only the last 4 digits are sent to the server
      cardLast4 = card.number.replace(/\s/g, '').slice(-4);
    }

    setPlacing(true);
    try {
      const result = await postJSON('/place_order', {
        shipping_address: address,
        payment_method: paymentMethod,
        card_last4: cardLast4
      });
      const data = await getJSON(`/order_confirmation/${result.order_id}`);
      setOrder(data.order);
      setCard(EMPTY_CARD);
      refreshCart();
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  }

  if (checking) return <p>Loading...</p>;
  if (!user) return <LoginNotice text="Please log in to check out." next="/checkout" />;
  if (order) return <OrderConfirmation order={order} />;
  if (loading) return <p>Loading...</p>;

  if (cart.length === 0) {
    return (
      <div className="box">
        <p>Your cart is empty. Add some items to proceed.</p>
        <Link className="button" to="/">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="box" onSubmit={handlePlaceOrder}>
          <h2>1. Shipping address</h2>
          <textarea
            rows="3"
            placeholder="House number, street, city, PIN code"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />

          <h2>2. Payment method</h2>
          <label className="radio">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            Cash on Delivery
          </label>
          <label className="radio">
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={paymentMethod === 'Card'}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            Credit / Debit card
          </label>

          {paymentMethod === 'Card' && (
            <div className="card-fields">
              <p className="small">Demo payment: no money is taken and only the last 4 digits are saved.</p>
              <label>
                Card number
                <input
                  inputMode="numeric"
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  autoComplete="off"
                  value={card.number}
                  onChange={(event) => updateCard('number', event.target.value)}
                />
              </label>
              <div className="two-columns">
                <label>
                  Expiry (MM/YY)
                  <input
                    maxLength="5"
                    placeholder="MM/YY"
                    autoComplete="off"
                    value={card.expiry}
                    onChange={(event) => updateCard('expiry', event.target.value)}
                  />
                </label>
                <label>
                  CVV
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength="4"
                    autoComplete="off"
                    value={card.cvv}
                    onChange={(event) => updateCard('cvv', event.target.value)}
                  />
                </label>
              </div>
              <label>
                Name on card
                <input autoComplete="off" value={card.name} onChange={(event) => updateCard('name', event.target.value)} />
              </label>
            </div>
          )}

          {error && <p className="message error">{error}</p>}

          <button type="submit" className="full-width" disabled={placing}>
            {placing ? 'Placing order...' : `Place order (${formatPrice(total)})`}
          </button>
        </form>

        <div className="box">
          <h2>Order summary</h2>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.product_id}>
                <span>
                  {item.product_name} x {item.quantity}
                </span>
                <span>{formatPrice(item.total_price)}</span>
              </li>
            ))}
          </ul>
          <p className="summary-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </p>
          <Link to="/cart">Edit cart</Link>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmation({ order }) {
  return (
    <div className="box confirmation">
      <h1>Thank you!</h1>
      <p className="message success">Your order has been placed successfully.</p>
      <p>
        <strong>Order number:</strong> #{order.order_id}
      </p>
      <p>
        <strong>Payment:</strong> {order.payment_method}
        {order.card_last4 && ` ending in ${order.card_last4}`} ({order.payment_status})
      </p>
      <p>
        <strong>Order status:</strong> {order.order_status}
      </p>
      <p>
        <strong>Ship to:</strong> {order.shipping_address}
      </p>
      <OrderItems items={order.items} />
      <p className="price big">Total: {formatPrice(order.total_price)}</p>
      <div className="actions">
        <Link className="button" to="/">
          Continue shopping
        </Link>
        <Link to="/account">View my orders</Link>
      </div>
    </div>
  );
}
