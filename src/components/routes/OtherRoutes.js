import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CheckoutForm from '../pages/checkout/checkout';


const OtherRoutes = () => {
  return (
    <Routes>
      <Route path="/checkout" element={<CheckoutForm />} />
     
    </Routes>
  );
};

export default OtherRoutes;
