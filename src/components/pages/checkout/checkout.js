import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import './checkout.css';

const CheckoutForm = () => {
  const { cartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    items: [],
    source: localStorage.getItem('source') || 'unknown',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Effect to set the items when cartItems change
  useEffect(() => {
    const items = cartItems.map((item) => ({
      product_id: item.product_id,
      name: item.name,
      quantity: item.quantity,
      totalPrice: Number(item.totalPrice), // Use totalPrice from cartItems
      selectedColor: item.selectedColor || null, // Ensure selectedColor is passed
      selectedSizes: JSON.stringify(item.selectedSizes) || null, // Stringify selectedSizes for backend
      image_url: item.image_url,
      subtotal_price: (item.quantity * Number(item.totalPrice)).toFixed(2), // Calculate subtotal
    }));
    setFormData((prev) => ({ ...prev, items }));
    console.log('Checkout initiated with items:', items); // Log items for debugging
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const total_price = calculateTotalPrice(); // Calculate total price
    const order_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const dataToSend = { ...formData, total_price, order_date };
    console.log('Preparing to create order with the following details:', dataToSend); // Log data to send

    try {
      const response = await axios.post('http://localhost:4000/api/orders/', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status !== 201) {
        throw new Error('Failed to create order');
      }

      const data = await response.data;
      console.log('Order created successfully:', data); // Log response from the server
      navigate('/payment', { state: { formData: dataToSend } });
    } catch (error) {
      setErrorMessage('Error creating order: ' + error.message);
      console.error('Error creating order:', error); // Log the error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Calculate the total price for all items in the cart
  const calculateTotalPrice = () => {
    const total = cartItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);
    console.log('Total price calculated:', total); // Log total price
    return total.toFixed(2);
  };

  return (
    <div className="checkout-container">
      <h2>Enter your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="order-form">
          <label>
            User Name:
            <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            City:
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </label>
          <label>
            State:
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </label>
          <label>
            Zip Code:
            <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} required />
          </label>
        </div>

        <div className="order-summary">
          <h3>Your Items:</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="item-summary">
              <img src={item.image_url} alt={item.name} className="item-image" />
              <div>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Selected Color: {item.selectedColor || 'N/A'}</p>
                
                {/* Render selected_sizes properly */}
                <p>Selected Sizes: {item.selectedSizes ? (
                  Object.entries(JSON.parse(item.selectedSizes)).map(([size, count]) => (
                    <span key={size}>{size}: {count} </span>
                  ))
                ) : 'N/A'}</p>

                <p>Subtotal Price: ${item.subtotal_price}</p>
              </div>
            </div>
          ))}

          {/* Display only the total price */}
          <div className="total-price">
            <h3>Total Price: ${calculateTotalPrice()}</h3>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
