import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderList.css'; // Import your specific styles for the orders page

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders/');
        setOrders(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, event) => {
    setSelectedStatus(prev => ({ ...prev, [orderId]: event.target.value }));
  };

  const updateOrderStatus = async (orderId) => {
    const newStatus = selectedStatus[orderId];
    if (!newStatus) {
      console.error('No status selected for order ID:', orderId);
      return;
    }

    setUpdatingStatus(true);

    try {
      const payload = {
        order_id: orderId,
        new_status: newStatus
      };

      console.log('Sending update request with payload:', payload);

      const response = await axios.put('http://localhost:4000/api/orders/status', payload);
      
      console.log('Update response:', response.data);

      // Refresh the orders list after updating status
      const ordersResponse = await axios.get('http://localhost:4000/api/orders/');
      console.log('Refreshed orders response:', ordersResponse.data);
      setOrders(ordersResponse.data);
    } catch (err) {
      console.error('Error updating order status:', err.response?.data || err.message);
      setError('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="orders-list">
      <h1>Orders List</h1>
      <div className="orders-cards">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h2>Order ID: {order.id}</h2>
            <p><strong>User Name:</strong> {order.user_name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone Number:</strong> {order.phone_number}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>City:</strong> {order.city}</p>
            <p><strong>State:</strong> {order.state}</p>
            <p><strong>Zip Code:</strong> {order.zip_code}</p>
            <p><strong>County:</strong> {order.county}</p>
            <p><strong>Shipping Fee:</strong> ${order.shipping_fee}</p>
            <p><strong>Total Price:</strong> ${order.total_price}</p>
            <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
            <p><strong>Current Status:</strong> {order.current_status}</p>
            <div className="status-update">
              <select
                value={selectedStatus[order.id] || order.current_status}
                onChange={(e) => handleStatusChange(order.id, e)}
              >
                <option value="pending">Pending</option>
                <option value="in_transit">In Transit</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              <button
                className="secondary-button"
                onClick={() => updateOrderStatus(order.id)}
                disabled={updatingStatus}
              >
                {updatingStatus ? 'Updating...' : 'Update Status'}
              </button>
            </div>
            {order.items.length > 0 && (
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.product_id} className="item-card">
                    <img src={item.image_url} alt={item.name} />
                    <p><strong>Product Name:</strong> {item.name}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Total Price:</strong> ${item.total_price_item}</p>
                    <p><strong>Color:</strong> {item.selected_color || 'N/A'}</p>
                    <p><strong>Sizes:</strong> {item.selected_sizes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
