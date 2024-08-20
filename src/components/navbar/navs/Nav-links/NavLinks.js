import React from 'react';
import { Link } from 'react-router-dom';
import '../navbar/Nav.css';

const NavLinks = () => {
  return (
    <div className="nav-links">
      <Link to="/" className="link">Home</Link>
      <Link to ='submission' className='link'>Submission</Link>
      <Link to="/questions" className="link">Questions</Link>
      <Link to="/login" className="link">Login</Link>
      <Link to="/register" className="link">Register</Link>
      <Link to="/profile" className="link">Profile</Link>
      <Link to="/visit" className="link">Blog-Home</Link>
      <Link to="/blog" className="link">Blogging</Link>
      <Link to="/create-post" className="link">Create-blog</Link>
     <Link to="/orders" className="link">Orders</Link>
      <Link to="/men" className="link">Stationary</Link>
      <Link to="/featured" className="link">Featured</Link>
      <Link to="/create-product" className='link'>CreateForm</Link>
      <Link to="/product-list" className='link'>ProductList</Link>
      

      
    </div>
  );
};

export default NavLinks;
