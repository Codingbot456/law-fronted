import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import DashNav from './Dash-nav';
import './DashHome.css'; // Import the CSS file

function DashHome() {
  return (
    <div className="dash-home-container">
      <div className="dash-home-nav">
      
      </div>
      <div className="dash-home-content">
        <Outlet /> {/* Render the matched child route */}
      </div>
    </div>
  );
}

export default DashHome;
