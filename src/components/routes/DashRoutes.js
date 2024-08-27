import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateForm from '../dashboard/createForm';
import OrdersList from '../dashboard/OrderList';
import ProductList from '../dashboard/ProductList';
import DashHome from '../dashboard/Dash-home';
import AllUsers from '../dashboard/Users';

const DashRoutes = () => {
  return (
    <Routes>
      <Route path="/dash-home" element={<DashHome />}>
        <Route index element={<OrdersList />} /> {/* Default view */}
        <Route path="create-product" element={<CreateForm />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="all-users" element={<AllUsers />} />
      </Route>
    </Routes>
  );
};

export default DashRoutes;
