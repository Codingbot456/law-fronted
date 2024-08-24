import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
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
  const [imagePreview, setImagePreview] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
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

    fetchUserDetails();
    fetchUserQuestionsAndAnswers();
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

  // Calculate totals
  const totalPaidAmount = questions
    .filter(q => q.paymentStatus === 'completed')
    .reduce((total, q) => total + (q.budget || 0), 0);

  const totalPendingAmount = questions
    .filter(q => q.paymentStatus === 'pending')
    .reduce((total, q) => total + (q.budget || 0), 0);

  const totalAnsweredAmount = questions
    .reduce((total, q) => total + (q.answerBudget || 0), 0);

  // Safeguard with default values to ensure they are numbers
  const safeToFixed = (value) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? '0.00' : numberValue.toFixed(2);
  };

  return (
    <div className="edit-profile">
      <h2>{isEditing ? 'Edit Profile' : 'Profile Details'}</h2>
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
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password (leave blank to keep current password):</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.apiError && <span className="error-message">{errors.apiError}</span>}
          {successMessage && <span className="success-message">{successMessage}</span>}
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="profile-details">
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
              <td>${q.budget || 0}</td>
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
              <td>${q.answerBudget || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditProfile;
