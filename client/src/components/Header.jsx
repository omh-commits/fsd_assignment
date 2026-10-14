import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getJSON } from '../api';
import { useAuth } from '../AuthContext.jsx';

export default function Header() {
  const { user, setUser, cartCount } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await getJSON('/logout');
    } finally {
      setUser(null);
      navigate('/account');
    }
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <img src="/images/flogo.jpg" alt="" />
          <span>Leafy Village</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" end>
            Shop
          </NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/account">{user ? `Hi, ${user.username}` : 'Login'}</NavLink>
          {user && (
            <button type="button" className="link-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
