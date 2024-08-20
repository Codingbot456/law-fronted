import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderList.css'; // Import your CSS styles for the orders page

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders/');
        console.log('Fetched orders response:', response.data); // Log the fetched data
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Order List</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <h2>Order ID: {order.id}</h2>
            <p>User Name: {order.user_name}</p>
            <p>Email: {order.email}</p>
            <p>Phone: {order.phone_number}</p>
            <p>Address: {order.address}, {order.city}, {order.state}, {order.zip_code}</p>
            <p>Total Price: ${order.total_price}</p>
            <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
            <h3>Items:</h3>
            {order.items.length > 0 ? (
              order.items.map(item => (
                <div key={item.product_id} className="order-item">
                  <p>Product ID: {item.product_id}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal Price: ${item.subtotal_price}</p>
                  <p>Selected Color: {item.selected_color}</p>
                  <p>
                    Selected Sizes: {
                      item.selected_sizes ? (
                        // Parse the selected_sizes string to an object
                        (() => {
                          try {
                            const sizes = JSON.parse(item.selected_sizes);
                            return Object.entries(sizes).map(([size, quantity]) => `${size}: ${quantity}`).join(', ');
                          } catch (error) {
                            console.error('Error parsing selected_sizes:', error);
                            return 'N/A';
                          }
                        })()
                      ) : (
                        'N/A' // or handle undefined case as you prefer
                      )
                    }
                  </p>
                  <img src={item.image_url} alt={`Product ${item.product_id}`} className="item-image" />
                </div>
              ))
            ) : (
              <p>No items in this order.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersList;
