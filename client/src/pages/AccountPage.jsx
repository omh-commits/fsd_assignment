// Page 5 of 6: account
// Logged out -> login and register forms.
// Logged in  -> profile form (with picture upload) and order history.

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getJSON, postForm, postJSON } from '../api';
import { useAuth } from '../AuthContext.jsx';
import OrderItems from '../components/OrderItems.jsx';
import { formatDate, formatPrice, shrinkImage } from '../utils';

export default function AccountPage() {
  const { user, checking } = useAuth();

  if (checking) return <p>Loading...</p>;
  return user ? <Profile /> : <LoginRegister />;
}

function LoginRegister() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function switchTab(name) {
    setTab(name);
    setMessage('');
    setError('');
  }

  async function handleLogin(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setBusy(true);
    try {
      const data = await postJSON('/login', { username: form.username, password: form.password });
      setUser(data.user);
      // Go back to the page that asked for a login (only paths inside this site)
      const next = searchParams.get('next');
      if (next && next.startsWith('/') && !next.startsWith('//')) {
        navigate(next);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setBusy(true);
    try {
      const data = await postJSON('/register', form);
      setTab('login');
      setForm({ ...form, password: '' });
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="box auth-box">
      <div className="tabs">
        <button type="button" className={tab === 'login' ? 'active' : ''} onClick={() => switchTab('login')}>
          Login
        </button>
        <button type="button" className={tab === 'register' ? 'active' : ''} onClick={() => switchTab('register')}>
          Register
        </button>
      </div>

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}

      {tab === 'login' ? (
        <form onSubmit={handleLogin}>
          <label>
            Username
            <input name="username" value={form.username} onChange={updateField} autoComplete="username" required />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit" className="full-width" disabled={busy}>
            {busy ? 'Please wait...' : 'Log in'}
          </button>
          <p className="small">
            New here?{' '}
            <button type="button" className="link-button" onClick={() => switchTab('register')}>
              Create an account
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <label>
            Username
            <input name="username" value={form.username} onChange={updateField} autoComplete="username" required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" required />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              autoComplete="new-password"
              minLength="6"
              required
            />
          </label>
          <button type="submit" className="full-width" disabled={busy}>
            {busy ? 'Please wait...' : 'Register'}
          </button>
        </form>
      )}
    </div>
  );
}

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '', gender: '', address: '' });
  const [picture, setPicture] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0); // changing the key clears the file input
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function fillForm(user) {
    setProfile(user);
    setForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
      gender: user.gender || '',
      address: user.address || ''
    });
  }

  useEffect(() => {
    getJSON('/my_account')
      .then((data) => fillForm(data.user))
      .catch((err) => setError(err.message));
    getJSON('/my_orders')
      .then((data) => setOrders(data.orders))
      .catch((err) => setError(err.message));
  }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSave(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);

    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }

    try {
      if (picture) {
        // Upload a small 300 px JPEG instead of the full-size photo
        formData.append('profile_picture', await shrinkImage(picture), 'profile.jpg');
      }
      const data = await postForm('/my_account', formData);
      fillForm(data.user);
      setPicture(null);
      setFileInputKey(fileInputKey + 1);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return error ? <p className="message error">{error}</p> : <p>Loading...</p>;
  }

  return (
    <div className="account-layout">
      <section className="box">
        <div className="profile-head">
          {profile.profile_picture ? (
            <img className="avatar" src={profile.profile_picture} alt="Profile" />
          ) : (
            <div className="avatar placeholder">{profile.username.charAt(0).toUpperCase()}</div>
          )}
          <div>
            <h1>{profile.username}</h1>
            <p className="small">{profile.email}</p>
          </div>
        </div>

        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        <form onSubmit={handleSave}>
          <div className="two-columns">
            <label>
              First name
              <input name="first_name" value={form.first_name} onChange={updateField} />
            </label>
            <label>
              Last name
              <input name="last_name" value={form.last_name} onChange={updateField} />
            </label>
          </div>
          <div className="two-columns">
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={updateField} maxLength="15" />
            </label>
            <label>
              Gender
              <select name="gender" value={form.gender} onChange={updateField}>
                <option value="">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>
          <label>
            Address
            <textarea name="address" rows="3" value={form.address} onChange={updateField} />
          </label>
          <label>
            Profile picture (png, jpg or gif)
            <input
              key={fileInputKey}
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              onChange={(event) => setPicture(event.target.files[0] || null)}
            />
          </label>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </section>

      <section className="box">
        <h2>My orders</h2>
        {orders.length === 0 && <p>You have not placed any orders yet.</p>}
        {orders.map((order) => (
          <div key={order.order_id} className="order">
            <p className="order-head">
              <strong>Order #{order.order_id}</strong>
              <span>{formatDate(order.created_at)}</span>
              <strong>{formatPrice(order.total_price)}</strong>
            </p>
            <p className="small">
              {order.payment_method}
              {order.card_last4 && ` ending in ${order.card_last4}`} &middot; Payment: {order.payment_status} &middot;
              Status: {order.order_status}
            </p>
            <OrderItems items={order.items} />
          </div>
        ))}
      </section>
    </div>
  );
}
