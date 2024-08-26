import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CheckoutForm from '../pages/checkout/checkout';
import AboutUs from '../pages/about/About';
import ServicesPage from '../pages/services/Services';
import LocationPage from '../pages/location/Location';
import Contacts from '../pages/contacts/Contacts';
import PaymentForm from '../pages/Payments/Pay';


const OtherRoutes = () => {
  return (
    <Routes>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/payment" element={<PaymentForm />} />

    
     
    </Routes>
  );
};

export default OtherRoutes;
