import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import CreateProductForm from '../dashboard/createForm'; // Correct path

const DashRoutes = () => {
  return (
    <Routes>
      <Route path="/create-product" element={<CreateProductForm />} />
    </Routes>
  );
};

export default DashRoutes;
