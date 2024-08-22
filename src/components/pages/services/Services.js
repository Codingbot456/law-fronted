// src/pages/ServicesPage.js
import React from 'react';
import './services.css'; // Import specific styles for the Services page

const ServicesPage = () => (
  <div className="services-page">
    <section className="services-section">
      <h2>Our Services</h2>
      <ul>
        <li><strong>Law Solver:</strong> Our AI-driven tool helps you tackle complex legal problems with ease, providing clear, actionable solutions.</li>
        <li><strong>Blog:</strong> Stay updated with the latest legal insights, tips, and news from industry experts through our regularly updated blog.</li>
        <li><strong>eCommerce:</strong> Explore our curated selection of legal textbooks, study aids, and professional tools designed to enhance your legal education and practice.</li>
      </ul>
    </section>
  </div>
);

export default ServicesPage;
