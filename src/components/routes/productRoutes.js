import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Stationary from '../pages/productPages/categories/Stationary';
import Apparel from '../pages/productPages/categories/Apparell';
import StudyAids from '../pages/productPages/categories/StudyAids';
import OfficeSupplies from '../pages/productPages/categories/OfficeSupplies';
import Misc from '../pages/productPages/categories/Misc';
import Gadgets from '../pages/productPages/categories/Gadgets';
import Featured from '../pages/productPages/timeline/Featured';
import Discounted from '../pages/productPages/timeline/Discounted';
import NewArrival from '../pages/productPages/timeline/NewArrival';
import Home from '../pages/productPages/pages/Home';
import EcommerceLayout from '../pages/productPages/layout/EcommerceLayout';





const ProductRoutes = () => {
  return (
    <Routes>
      <Route path='/eccom-home' element={<EcommerceLayout />}>
        <Route index element={<Home />} /> {/* Default view */}
        <Route path='stationary' element={<Stationary />} />
        <Route path='apparel' element={<Apparel />} />
        <Route path='study' element={<StudyAids />} />
        <Route path='office' element={<OfficeSupplies />} />
        <Route path='misc' element={<Misc />} />
        <Route path='gadgets' element={<Gadgets />} />
        <Route path='featured' element={<Featured />} />
        <Route path='discounted' element={<Discounted />} />
        <Route path='newarrival' element={<NewArrival />} />
      </Route>
    </Routes>
  );
};

export default ProductRoutes;
