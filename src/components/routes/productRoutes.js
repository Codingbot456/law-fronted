import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Men from '../pages/productPages/categories/Men';


const ProductRoutes = () => {
  return (
    <Routes>
     
      <Route path='/men' element={<Men />} />
    </Routes>
  );
};

export default ProductRoutes;
