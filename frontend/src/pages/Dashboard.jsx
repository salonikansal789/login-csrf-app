import { useState } from 'react';
import { whoami, logout } from '../api/api.js';
import { toast } from 'react-toastify';

function Dashboard({ user, setUser }) {
    const [whoamiData, setWhoamiData] = useState(null);
  const handleWhoami = async () => {
    const me = await whoami();
    
    if (me.user) {
      toast.success('get data successful');
      setUser(me.user);
      setWhoamiData(me); 
    }
    if (me.error) 
      {
        toast.error(me.error);
      }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <div className="container">
      <h2>
        Hello, <strong>{user?.name}</strong>
      </h2>
      {user && (
        <div style={{ marginTop: '1rem', padding: '1rem',  }}>
          <h3>User Details</h3>
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
