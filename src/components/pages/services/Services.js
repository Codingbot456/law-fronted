// src/components/ServicesSection.js
import React from 'react';
import './services.css'; // Import your CSS file

const services = [
  {
    id: 1,
    title: 'Law Solver',
    description: 'Our AI-driven tool helps you tackle complex legal problems with ease, providing clear, actionable solutions.',
    backgroundImage: 'path/to/law-solver-image.jpg', // Replace with actual image path
  },
  {
    id: 2,
    title: 'Blog',
    description: 'Stay updated with the latest legal insights, tips, and news from industry experts through our regularly updated blog.',
    backgroundImage: 'path/to/blog-image.jpg', // Replace with actual image path
  },
  {
    id: 3,
    title: 'eCommerce',
    description: 'Explore our curated selection of legal textbooks, study aids, and professional tools designed to enhance your legal education and practice.',
    backgroundImage: 'path/to/ecommerce-image.jpg', // Replace with actual image path
  }
];

const ServicePage = () => {
  return (
    <section className="services-section">
      <div className="services-content">
        <h1>Our Services</h1>
        <div className="services-list">
          {services.map(service => (
            <div
              key={service.id}
              className="service-item"
              style={{ backgroundImage: `url(${service.backgroundImage})` }}
            >
              <div className="service-overlay">
                <div className="service-number">{service.id}</div>
                <div className="service-text">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
