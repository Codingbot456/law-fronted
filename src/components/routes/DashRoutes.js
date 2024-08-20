import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import CreateForm from '../dashboard/createForm'; // Correct path
import OrderList from '../dashboard/OrderList';
import PaymentForm from '../pages/Payments/Pay';
import ProductList from '../dashboard/ProductList';

const DashRoutes = () => {
  return (
    <Routes>
      <Route path="/payment" element={<PaymentForm />} />
       <Route path="/orders" element={<OrderList />} />
      <Route path="/create-product" element={<CreateForm />} />
      <Route path="/product-list" element={<ProductList />} />

    </Routes>
  );
};

export default DashRoutes;
