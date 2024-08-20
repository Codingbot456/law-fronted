// components/paypal/PayPalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ amount, onSuccess }) => {
  const handleCreateOrder = async (data, actions) => {
    const response = await axios.post('http://localhost:4000/api/paypal/create-order', { amount });
    return response.data.id;
  };

  const handleApproveOrder = async (data, actions) => {
    await axios.post('http://localhost:4000/api/paypal/capture-order', { orderID: data.orderID });
    onSuccess(); // Call the parent component's success handler
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        createOrder={(data, actions) => handleCreateOrder(data, actions)}
        onApprove={(data, actions) => handleApproveOrder(data, actions)}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
