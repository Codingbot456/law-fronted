import React from 'react';
import { NavLink } from 'react-router-dom';
import './DashNav.css'
const DashNav = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><NavLink to="/dash-home">Orders</NavLink></li>
        <li className="navbar-item"><NavLink to="/dash-home/create-product">Create</NavLink></li>
        <li className="navbar-item"><NavLink to="/dash-home/product-list">Edit</NavLink></li>
        <li className="navbar-item"><NavLink to="/dash-home/orders">Orders</NavLink></li>
      </ul>
    </nav>
  );
};

export default DashNav;
