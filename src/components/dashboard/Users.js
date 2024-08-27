// src/components/AllUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './AllUsers.css'; // Import specific styles for AllUsers component

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.response?.data?.msg || 'Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-users">
      <h2>All Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="profile-image"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="user-icon"
                    />
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
