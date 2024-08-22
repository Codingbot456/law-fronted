import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CheckoutForm from '../pages/checkout/checkout';
import AboutUs from '../pages/about/About';
import ServicesPage from '../pages/services/Services';
import LocationPage from '../pages/location/Location';
import Contacts from '../pages/contacts/Contacts';


const OtherRoutes = () => {
  return (
    <Routes>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/contacts" element={<Contacts />} />

    
     
    </Routes>
  );
};

export default OtherRoutes;
