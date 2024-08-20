import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state;

  const [paymentData, setPaymentData] = useState({
    phone_number: '254',
    total_price: Number(formData.total_price), // Ensure total_price is a number
    items: formData.items
  });

  const handleMpesaPayment = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/mpesa/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: paymentData.phone_number,
          amount: paymentData.total_price, // Use the numeric value
        }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Payment failed');
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
