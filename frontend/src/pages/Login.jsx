import { useState } from 'react';
import { whoami, login ,getCsrfToken} from '../api/api.js';
import { toast } from 'react-toastify';
function Login({ setUser,setWhoamIError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return; 
  try{
    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Login successful and fetching user data...');
      const csrfToken= await getCsrfToken();
      if(!csrfToken){
        toast.error('CSRF token not found. Please try again.');
        return;
      }
      
      const whoamiData = await whoami(csrfToken);
      if(whoamiData.success){
      setUser(whoamiData.data.user);
      }
      else{
        setWhoamIError(whoamiData.message || 'Failed to fetch user data');
        toast.error( 'Failed to fetch user data by using whoami');
      }
    } else {
      toast.error(result.message || 'Login failed')
    }
  } catch (error) {
    toast.error('Login failed. Please try again.');
  }

  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} noValidate>
        <h2>Login</h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
