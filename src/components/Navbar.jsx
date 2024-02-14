import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const themes = {
  light: 'light',
  dracula: 'dracula',
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.light;
};

const Navbar = () => {
  const [theme, setTheme] = useState(() => getThemeFromLocalStorage());
  const [cartCount, setCartCount] = useState(0);
  const cartItems = useSelector(state => state.cart.items);

  const handleTheme = () => {
    const newTheme = theme === themes.light ? themes.dracula : themes.light;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  return (
    <nav className="navbar bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start mx-8">
          <NavLink to="/" className="lg:flex btn btn-primary text-2xl items-center">
            Misina Shop 😎
          </NavLink>
        </div>

        <div className="navbar-end mx-8">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} checked={theme === themes.dracula} />
            <BsSunFill className={`swap-on h-4 w-4 ${theme === themes.dracula ? 'text-yellow-500' : ''}`} />
            <BsMoonFill className={`swap-off h-4 w-4 ${theme === themes.light ? 'text-blue-700' : ''}`} />
          </label>

          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4" key="cart-link">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              {cartCount > 0 && <span className="badge badge-sm badge-primary indicator-item">{cartCount}</span>}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
