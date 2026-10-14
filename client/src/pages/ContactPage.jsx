// Page 6 of 6: contact form (anyone can use it, no login needed)
// Sends the message to POST /api/contact, which saves it in the "messages" table.

import { useEffect, useState } from 'react';
import { postJSON } from '../api';
import { useAuth } from '../AuthContext.jsx';

const EMPTY_FORM = { name: '', email: '', message: '' };

export default function ContactPage() {
  const { user } = useAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fill in the name and email for logged in users
  useEffect(() => {
    if (user) {
      setForm((current) => ({
        ...current,
        name: current.name || user.username,
        email: current.email || user.email
      }));
    }
  }, [user]);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setSending(true);
    try {
      const data = await postJSON('/contact', form);
      setMessage(data.message);
      setForm({ ...form, message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <h1>Contact us</h1>

      <div className="contact-layout">
        <form className="box" onSubmit={handleSubmit}>
          <p className="small">Please fill out all fields. We usually reply within one working day.</p>

          {message && <p className="message success">{message}</p>}
          {error && <p className="message error">{error}</p>}

          <label>
            Name
            <input name="name" value={form.name} onChange={updateField} maxLength="100" required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={updateField} maxLength="150" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={updateField} required />
          </label>
          <button type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send message'}
          </button>
        </form>

        <div className="box">
          <h2>Hours of operation</h2>
          <p>9:00 to 17:00, Monday to Friday (except holidays)</p>
          <h2>Phone</h2>
          <p>+91 9427802388</p>
          <h2>Email</h2>
          <p>
            <a href="mailto:leafvillageinfo@gmail.com">leafvillageinfo@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
