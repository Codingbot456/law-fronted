import React from 'react';
import { Outlet } from 'react-router-dom';
import EccomerceNav from '../eccom-nav/EccomerceNav';

const EcommerceLayout = () => {
  return (
    <div className="ecommerce-layout">
      <EccomerceNav />
      <div className="ecommerce-content">
        <Outlet /> {/* Render the matched child route */}
      </div>
    </div>
  );
};

export default EcommerceLayout;
