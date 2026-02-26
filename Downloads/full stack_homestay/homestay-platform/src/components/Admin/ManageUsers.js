import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import UserStorage from '../../utils/UserStorage';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(UserStorage.getAllUsers());
  }, []);

  return (
    <div className="manage-section">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
