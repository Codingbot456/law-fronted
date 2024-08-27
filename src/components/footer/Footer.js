// src/components/Footer.js
import React from 'react';
import './footer.css';

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
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/site-map">Site Map</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>123 Legal Lane, Suite 456</p>
          <p>Legal City, LC 78901</p>
          <p>Email: contact@lawschool.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Newsletter Signup</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" aria-label="Email Address" />
            <button type="submit" className="primary-button">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Law School. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
