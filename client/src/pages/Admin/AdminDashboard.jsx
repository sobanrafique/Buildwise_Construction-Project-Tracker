import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../config/api';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'site_worker'
  });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users on load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.ADMIN.GET_USERS);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_ENDPOINTS.ADMIN.CREATE_USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('User Created Successfully!');
        setFormData({ name: '', email: '', password: '', role: 'site_worker' }); // Reset form
        fetchUsers(); // Refresh list
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Server Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard: Manage Users</h2>
      
      {/* Create User Form */}
      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h3>Add New Employee</h3>
        {message && <p style={{ color: 'blue' }}>{message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <input type="text" placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
          <select onChange={e => setFormData({...formData, role: e.target.value})}>
            <option value="site_worker">Site Worker</option>
            <option value="project_manager">Project Manager</option>
          </select>
          <button type="submit">Create User</button>
        </form>
      </div>

      {/* User List */}
      <h3>Existing Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} ({user.role}) - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
