import React from 'react';
import Carousel from '../../components/slide/slider';
import Brand from '../../components/home/brand';
import Footer from '../../components/home/footer';
import Sub from '../productPages/Sub';
import Subs from '../productPages/Subs';
import Sub3 from '../productPages/Sub3';

import Search from '../../components/filters/Search'; // Import your updated Search component



import './pages.css';

function HomePage() {
  return (
    <div className='home-page'>
      <div className="hero-section">
        <div className='sec1'>
          <img src="images/banner-1.webp" className="large-image" alt="Banner 1" />
          <img src="images/banner-2.webp" className="small-image" alt="Banner 2" />
          <img src="images/banner-3.webp" className="small-image" alt="Banner 3" />
        </div>
        <div className='sec2'>
          <img src="images/banner-4.webp" className="small-image" alt="Banner 4" />
          <img src="images/banner-5.webp" className="small-image" alt="Banner 5" />
          <img src="images/banner-6.webp" className="large-image" alt="Banner 6" />
        </div>
      </div>

      <div className="section">
        <Sub />
      </div>
      <div className="section">
        <Carousel />
      </div>
      <div className="section">
        <Sub3 />
      </div>
      <div className="section">
        <Brand />
      </div>
      <div className="section">
        <Subs />
      </div>
      <div className="section">
      
      </div>
     
      <div className="section">
     
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
