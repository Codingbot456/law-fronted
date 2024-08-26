import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure this import matches your setup
import './profile.css'; // Ensure this CSS file is updated with the new styles
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon from react-icons

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    profileImage: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [orders, setOrders] = useState([]); // State for user orders
  const [imagePreview, setImagePreview] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State to track expanded order details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrors({ apiError: 'No token found. Please log in.' });
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:4000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(res.data);
        setImagePreview(res.data.profileImage);
      } catch (error) {
        console.error('Error fetching user details:', error);
        if (error.response && error.response.status === 401) {
          setErrors({ apiError: 'Unauthorized. Please log in again.' });
          navigate('/login');
        } else {
          setErrors({ apiError: 'An error occurred. Please try again.' });
        }
      }
    };

    const fetchUserQuestionsAndAnswers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const askedRes = await axios.get(`http://localhost:4000/api/submissions/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const answeredRes = await axios.get(`http://localhost:4000/api/submissions/user/answers/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const combinedQuestions = askedRes.data.map((question) => {
          const answer = answeredRes.data.find(
            (ans) => ans.submissionId === question.id
          );
          return {
            ...question,
            answer: answer ? answer.answer : null,
            answerBudget: answer ? answer.budget : 0,
            paymentStatus: answer ? answer.paymentStatus : 'pending'
          };
        });
        setQuestions(combinedQuestions);
      } catch (error) {
        console.error('Error fetching user questions or answers:', error);
        setErrors({ apiError: 'An error occurred. Please try again.' });
      }
    };

    const fetchUserOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const res = await axios.get(`http://localhost:4000/api/orders/user-orders/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        setErrors({ apiError: 'An error occurred while fetching orders.' });
      }
    };

    fetchUserDetails();
    fetchUserQuestionsAndAnswers();
    fetchUserOrders();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrors({ apiError: 'No token found. Please log in.' });
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.put('http://localhost:4000/api/user', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false); // Exit edit mode after successful update
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ apiError: error.response.data.msg });
      } else {
        setErrors({ apiError: 'An error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Debugging: Log the questions data
  console.log("Questions Data:", questions);

  // Calculate totals with safeguards for undefined values
  const totalPaidAmount = questions
    .filter(q => q.paymentStatus === 'completed')
    .reduce((total, q) => total + (Number(q.budget) || 0), 0);

  const totalPendingAmount = questions
    .filter(q => q.paymentStatus === 'pending')
    .reduce((total, q) => total + (Number(q.budget) || 0), 0);

  const totalAnsweredAmount = questions
    .reduce((total, q) => total + (Number(q.answerBudget) || 0), 0);

  // Safeguard with default values to ensure they are numbers
  const safeToFixed = (value) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? '0.00' : numberValue.toFixed(2);
  };

  const handleToggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="edit-profile">
      <h2>{isEditing ? 'Edit Profile' : 'My-Account'}</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="profile-image-container">
            <img
              src={imagePreview || 'default-profile-image.png'}
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-image-edit">
              <label htmlFor="profileImage" className="edit-icon">
                <FaEdit />
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
          </div>
          <div>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </label>
          </div>
          <div>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <span className="error">{errors.location}</span>}
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <div className="profile-image-container">
            <img
              src={imagePreview || 'default-profile-image.png'}
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-image-edit">
              <label htmlFor="profileImage" className="edit-icon" onClick={() => setIsEditing(true)}>
                <FaEdit />
              </label>
            </div>
          </div>
          <div>
            <strong>Name:</strong> {formData.name}
          </div>
          <div>
            <strong>Email:</strong> {formData.email}
          </div>
          <div>
            <strong>Phone:</strong> {formData.phone}
          </div>
          <div>
            <strong>Location:</strong> {formData.location}
          </div>
        </div>
      )}

      <h2>My Tasks</h2>
      <div className="tasks-summary">
        <p>Total Paid Amount: ${safeToFixed(totalPaidAmount)}</p>
        <p>Total Pending Amount: ${safeToFixed(totalPendingAmount)}</p>
        <p>Total Answered Amount: ${safeToFixed(totalAnsweredAmount)}</p>
      </div>

      <h3>Tasks</h3>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Budget</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.question}</td>
              <td>{q.answer || 'Not Answered'}</td>
              <td>${safeToFixed(q.budget)}</td>
              <td>{q.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Answered Tasks</h3>
      <table className="questions-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Answer Budget</th>
          </tr>
        </thead>
        <tbody>
          {questions.filter(q => q.answer).map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.question}</td>
              <td>{q.answer}</td>
              <td>${safeToFixed(q.answerBudget)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>My Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>
                    <button onClick={() => handleToggleOrderDetails(order.id)}>
                      {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr>
                    <td colSpan="2">
                      <div className="order-details">
                        <h3>Order Details</h3>
                        <p><strong>Order ID:</strong> {order.id}</p>
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
                        <h4>Items:</h4>
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
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="2">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

    
    </div>
  );
};

export default EditProfile;
