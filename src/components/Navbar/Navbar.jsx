import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);



  const navigate = useNavigate();

  const handleLogout = () => {  
    localStorage.removeItem('token');
    setToken("");
    navigate("/")
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src={assets.logo_logo} alt="Logo" className="logo-img" />
          <span className="logo-text"></span>
        </Link>

        {/* Desktop Menu */}
        <ul className={`menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" className={menu === "home" ? "active" : ""} onClick={() => setMenu('home')}>Home</Link></li>
          <li><a href="#explore-menu" className={menu === "menu" ? "active" : ""} onClick={() => setMenu('menu')}>Menu</a></li>
          <li><a href="#app-download" className={menu === "mobile-App" ? "active" : ""} onClick={() => setMenu('mobile-App')}>Mobile-App</a></li>
          <li><a href="#footer" className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu('contact-us')}>Contact Us</a></li>
        </ul>

        {/* Right Side */}
        <div className="navbar-right">
          <img src={assets.search_icon} alt="Search" className="icon" />

          <div className="cart-icon-container">
            <Link to="/Cart"><img src={assets.basket_icon} alt="Cart" className="icon" /></Link>
            {getTotalCartAmount() > 0 && <span className="cart-dot"></span>}
          </div>

          {/* Profile Dropdown */}
          <div className="profile-container">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                {!token ? (
                  <>
                    <button onClick={() => { setShowLogin(true); setDropdownOpen(false); }}>Sign Up</button>
                    <button onClick={() => { setShowLogin(true); setDropdownOpen(false); }}>Login</button>
                  </>
                ) : (
                  <>
                    <Link to="/orders" onClick={() => setDropdownOpen(false)}><img src={assets.bag_icon} alt=''/>Orders</Link>
                    <button onClick={() => { handleLogout(); setDropdownOpen(false); }}><img src={assets.logout_icon} alt=''/>Logout</button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
