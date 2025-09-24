import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
console.log("user in app:", user);
  return (
    <div style={{ padding: '2rem' }}>

      {!user ? (
        <Login setUser={setUser}  />
      ) : (
        <Dashboard user={user} setUser={setUser} />
      )}

    </div>
  );
}

export default App;
