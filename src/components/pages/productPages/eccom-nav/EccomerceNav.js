import React from 'react';
import { Link } from 'react-router-dom';
import './EccomerceNav.css'

function EccomerceNav() {
  return (
    <nav2>
      <ul>
        <li><Link to='/eccom-home/stationary'>Stationary</Link></li>
        <li><Link to='/eccom-home/apparel'>Apparel</Link></li>
        <li><Link to='/eccom-home/study'>Study Aids</Link></li>
        <li><Link to='/eccom-home/office'>Office Supplies</Link></li>
        <li><Link to='/eccom-home/misc'>Miscellaneous</Link></li>
        <li><Link to='/eccom-home/gadgets'>Gadgets</Link></li>
        <li><Link to='/eccom-home/featured'>Featured</Link></li>
        <li><Link to='/eccom-home/discounted'>Discounted</Link></li>
        <li><Link to='/eccom-home/newarrival'>New Arrival</Link></li>
        <li><Link to='/eccom-home'>Home</Link></li>
      </ul>
    </nav2>
  );
}

export default EccomerceNav;
