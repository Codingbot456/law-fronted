import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state;

  // Ensure formData has an orderId
  const [paymentData, setPaymentData] = useState({
    phone_number: '254',
    total_price: Number(formData.total_price), // Ensure total_price is a number
    items: formData.items,
    orderId: formData.orderId || '' // Ensure orderId is available
  });

  const handleMpesaPayment = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/mpesa2/stkpush2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: paymentData.phone_number,
          amount: paymentData.total_price,
          orderId: paymentData.orderId, // Include orderId in the request
        }),
      });
  
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log('Payment initiated successfully');
        console.log('Checkout Request ID:', result.checkoutRequestId); // Display the reference ID
  
        // Optionally store the reference ID in the state or local storage for later use
        setPaymentData({
          ...paymentData,
          checkoutRequestId: result.checkoutRequestId
        });
  
        // Redirect to a different page or show a success message
        navigate('/'); // Redirect to homepage or appropriate page
      } else {
        // Handle text response
        const text = await response.text();
        console.log('Unexpected response format:', text);
        // You might want to handle or display the text response here
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone_number' && value.startsWith('254')) {
      setPaymentData({ ...paymentData, [name]: value });
    }
  };

  return (
    <div className='payhere'>
      <div className="payment-container">
        <form onSubmit={handleMpesaPayment}>
          <h3>Payment Details</h3>
          <p>Total Amount: ${paymentData.total_price.toFixed(2)}</p> {/* Use toFixed on a number */}

          {paymentData.items.map((item, index) => (
            <div key={index}>
              <p>
                {item.name} - Quantity: {item.quantity} - Subtotal: ${Number(item.subtotal_price).toFixed(2)} {/* Ensure subtotal_price is treated as a number */}
              </p>
            </div>
          ))}

          <label>
            Phone Number:
            <input
              type="tel"
              name="phone_number"
              value={paymentData.phone_number}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Pay with Mpesa</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
