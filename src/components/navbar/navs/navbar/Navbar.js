import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import NavLinks from '../Nav-links/NavLinks';
import NavDropdown from '../Nav-Dropdown/SignUpDropdown';
import { SearchContext } from '../../../context/searchContext';
import './Nav.css';

const Navbar = ({ toggleSidebar, toggleCart }) => {
  return (
    <nav className="top-nav">
      <div className="top-nav-content">

        <div>
        <h1 className="title">Kenya Law Solver</h1>
        </div>
      
        <NavLinks />
        <button className="cart-toggler" onClick={toggleCart} aria-label="Toggle Cart">
          <FaShoppingCart className="cart-icon" />
        </button>
       
        <button className="sidebar-toggler" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
