import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
    const [whoamIError, setWhoamIError] = useState(null);

  return (
    <div style={{ padding: '2rem' }}>

      {!user ? (
        <Login setUser={setUser}  setWhoamIError={setWhoamIError}/>
      ) : (
        <Dashboard user={user} setUser={setUser}  />
      )}

      {!user && whoamIError && (
        <div style={{ marginTop: '1rem', color: 'red' ,alignItems:'center',display:'flex',justifyContent:'center'}}>
          Error fetching user data: {whoamIError}
        </div>
      )}

    </div>
  );
}

export default App;
