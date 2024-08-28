// src/components/LocationSection.js
import React from 'react';
import './Location.css'; // Import your CSS file
import apparel1 from '../../assets/images/apparel-1.jpg';

const LocationPage= () => {
  return (
    <section className="location-section">
      <div className="location-content">
        <h1>Our Location</h1>
        <div className="location-info">
          <div className="location-map">
            {/* Embed Google Maps or any map service */}
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.384507895212!2d-122.08385168468139!3d37.38605197982546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb730eb14c545%3A0x4f61ed3d99a4f29!2sGoogleplex!5e0!3m2!1sen!2sus!4v1634879248276!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="location-details">
          <div className='eccom-images'>
            <img src={apparel1} alt="Apparel" />
          </div>
            <div className="details-text">
              <h2>Our Office</h2>
              <p>123 Legal Lane, Suite 456</p>
              <p>Legal City, LC 78901</p>
              <p>Email: contact@lawschool.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationPage;
