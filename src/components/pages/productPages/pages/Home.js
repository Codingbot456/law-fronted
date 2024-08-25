import React from 'react';
import Slider from 'react-slick';
import Discounted1 from '../sub-home/Discounted1';
import NewArrival1 from '../sub-home/NewArrival1';
import Featured1 from '../sub-home/Feature1';
import apparel1 from '../../../assets/images/apparel-1.jpg';
import stationary from '../../../assets/images/stationary-1.jpg';
import study from '../../../assets/images/study-aids.jpg';
import office from '../../../assets/images/office supplies.jpg';
import office2 from '../../../assets/images/miscalenous-1.jpg';

import gadgets from '../../../assets/images/gadgets-1.jpg';
import './home.css';

const Home = () => {
  const settings = {
    dots: true,                // Show navigation dots
    infinite: true,            // Infinite looping
    speed: 500,                // Transition speed in milliseconds
    slidesToShow: 1,           // Show one slide at a time
    slidesToScroll: 1,         // Number of slides to scroll at a time
    centerMode: true,          // Enable centered mode
    centerPadding: '0px',      // Remove padding around the centered slide for full-width images
    autoplay: true,            // Enable automatic scrolling
    autoplaySpeed: 3000,       // Delay between slides in milliseconds
  };

  return (
    <div className="container">
      <h1>Place Your Order</h1>
      <div className='home-top'>
        <Slider {...settings}>
          <div>
            <img src={stationary} alt="Stationary" />
          </div>
          <div>
            <img src={apparel1} alt="Apparel" />
          </div>
          <div>
            <img src={study} alt="Study-Aids" />
          </div>
        </Slider>
      
      </div>
      <div className='discounted-section'>
        <Discounted1 />
      </div>
      <div className='new-arrival-section'>
        <NewArrival1 />
      </div>
      <div className='home-mid'>
        <div className='top-row'>
          <img src={office} alt="Office" />
          <img src={office2} alt="Office2" />
        </div>
        <div className='home-last'>
        <img src={gadgets} alt="Gadgets" />
      </div>
       
      </div>
     
      <div className='featured-section'>
        <Featured1 />
      </div>
    </div>
  );
}

export default Home;
