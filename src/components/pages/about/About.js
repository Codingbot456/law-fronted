// src/components/AboutSection.js
import React from 'react';
import './About.css'; // Import the component-specific CSS file
import apparel1 from '../../assets/images/apparel-1.jpg';

const AboutPage = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h1>About Us</h1>
        <div className="about-item">
        <div className='about-1'>
            <img src={apparel1} alt="Apparel" />
          </div>
          <div className="text-content">
            <h2>Mission and Values</h2>
            <p>
              At [Law School Name], we are dedicated to advancing legal education through a commitment to excellence, integrity, and justice.
              Our mission is to prepare the next generation of legal professionals with the skills and ethical grounding needed to excel in a dynamic legal landscape.
            </p>
          </div>
        </div>
        <div className="about-item">
        
          <div className="text-content">
            <h2>Innovative Features and Resources</h2>
            <div className='about-1'>
            <img src={apparel1} alt="Apparel" />
          </div>
            <p>
              Our website features a range of resources designed to enrich the learning experience. Our blog offers insights and updates on legal trends,
              faculty research, and student achievements. The e-commerce section provides access to a variety of legal books, tools, and merchandise,
              while LawSolver delivers practical solutions and legal guidance for common issues.
            </p>
          </div>
        </div>
        <div className="about-item">
         
          <div className="text-content">
            <h2>Student Experience and Community Engagement</h2>
            <p>
              Students at [Law School Name] benefit from immersive learning opportunities through our clinical programs, internships,
              and active participation in student organizations. Our dedication to community engagement is reflected in our extensive pro bono work
              and partnerships with local organizations, ensuring our students are well-prepared to contribute meaningfully to society.
            </p>
          </div>
          <div className='about-1'>
            <img src={apparel1} alt="Apparel" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
