// src/components/ServicesSection.js
import React from 'react';
import './services.css'; // Ensure this path is correct

const services = [
  {
    title: 'Law Solver',
    description: 'Our AI-driven tool helps you tackle complex legal problems with ease, providing clear, actionable solutions.',
    image: 'path/to/law-solver-image.jpg', // Placeholder for an image
    details: 'Our advanced algorithms analyze legal documents and case laws to give you practical advice and guidance, saving you time and reducing legal complexities.',
    link: '/submission', // Add the link here
  },
  {
    title: 'Blog',
    description: 'Stay updated with the latest legal insights, tips, and news from industry experts through our regularly updated blog.',
    image: 'path/to/blog-image.jpg', // Placeholder for an image
    details: 'Our blog features articles on various legal topics, interviews with legal professionals, and commentary on recent legal developments. It’s a valuable resource for anyone interested in the legal field.',
    link: '/visit', // Add the link here
  },
  {
    title: 'eCommerce',
    description: 'Explore our curated selection of legal textbooks, study aids, and professional tools designed to enhance your legal education and practice.',
    image: 'path/to/ecommerce-image.jpg', // Placeholder for an image
    details: 'We offer a range of high-quality legal resources, including textbooks, online courses, and practice tools. Whether you’re a student or a professional, our eCommerce platform provides everything you need to succeed in the legal field.',
    link: '/eccom-home', // Add the link here
  }
];

const ServicePage = () => {
  return (
    <section className="services-section">
      <div className="services-content">
        <h1>Our Services</h1>
        <p>Discover how our tailored services can assist you in navigating the complexities of the legal world. From innovative AI solutions to comprehensive legal resources, we are here to support your legal needs.</p>
        <div className="services-list">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-overlay">
                <div className="service-number">{index + 1}</div>
                <div className="service-text">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <p className="service-details">{service.details}</p>
                  <a href={service.link} className="service-button">Learn More</a> {/* Changed from button to a */}
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
