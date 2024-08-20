import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Men from '../pages/productPages/categories/Men';
import Featured from '../pages/productPages/timeline/Featured';


const ProductRoutes = () => {
  return (
    <Routes>
     
      <Route path='/men' element={<Men />} />
      <Route path='/featured' element={<Featured />} />
    </Routes>
  );
};

export default ProductRoutes;
