// src/components/Footer.js
import React from 'react';
import './footer.css'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>LawSolver</h3>
          <ul>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Blog</h3>
          <ul>
            <li><a href="/blog">Latest Posts</a></li>
            <li><a href="/blog/legal-tips">Legal Tips</a></li>
            <li><a href="/blog/case-studies">Case Studies</a></li>
            <li><a href="/blog/community">Community Insights</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>E-Commerce</h3>
          <ul>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/checkout">Checkout</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-media">
            <a href="https://facebook.com" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://instagram.com" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Law School. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
