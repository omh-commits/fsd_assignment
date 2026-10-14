// Keeps track of who is logged in and how many items are in the cart,
// so every page and the header can read it with useAuth().

import { createContext, useContext, useEffect, useState } from 'react';
import { getJSON } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true); // true until we know if someone is logged in
  const [cartCount, setCartCount] = useState(0);

  async function refreshCart() {
    try {
      const data = await getJSON('/cart');
      setCartCount(data.cart.reduce((sum, item) => sum + item.quantity, 0));
    } catch {
      setCartCount(0);
    }
  }

  // Ask the server once, when the site opens, if we are already logged in
  useEffect(() => {
    getJSON('/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  // Update the cart badge whenever the user logs in or out
  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setCartCount(0);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, checking, cartCount, refreshCart }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
