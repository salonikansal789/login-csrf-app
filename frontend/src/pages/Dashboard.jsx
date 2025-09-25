import { useState } from 'react';
import { whoami, logout ,getCsrfToken} from '../api/api.js';
import { toast } from 'react-toastify';

function Dashboard({ user, setUser }) {


  const handleLogout = async () => {
    try{
      const csrfToken= await getCsrfToken();
      if(!csrfToken){
        toast.error('CSRF token not found. Please try again.');
        return;
      }
    await logout(csrfToken);
    setUser(null);
    toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>
        Hello, <strong>{user?.name}</strong>
      </h2>
        <h3>Here are your details</h3>
      {user && (
        <div style={{ marginTop: '1rem', padding: '1rem',  }}>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Name:</strong> {user.name || '(no name)'}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      <button onClick={handleLogout} className="secondary">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
