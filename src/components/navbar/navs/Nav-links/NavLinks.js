import React from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from '../Nav-Dropdown/SignUpDropdown';
import '../navbar/Nav.css';

const NavLinks = () => {
  return (
    <div className="nav-links">
      <Link to="/" className="link">Home</Link>
      <Link to ='submission' className='link'>Post</Link>
      <Link to="/questions" className="link">Work</Link>
      <Link to="/visit" className="link">Blog</Link>
      <Link to="/stationary" className="link">Merchadise</Link>
      <Link to="/about" className="link">About</Link>
      <Link to="/services" className="link">Services</Link>
      <Link to="/location" className="link">Location</Link>
      <Link to="/contacts" className="link">ContactUs</Link>
      <Link to="/dash-home" className="link">Dashboard</Link>
      <Link to="/eccom-home" className="link">eccom</Link>
    
      <NavDropdown />     
    </div>
  );
};

export default NavLinks;
