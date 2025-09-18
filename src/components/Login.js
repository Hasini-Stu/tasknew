import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, getCurrentUser } from '../firebase/auth';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await logoutUser();
      if (result.success) {
        setUser(null);
        setError('');
        // Optionally redirect to home page
        navigate('/');
      } else {
        setError(result.error || 'Sign out failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      setError('An unexpected error occurred during sign out.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Please enter your password.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser(formData.email.trim(), formData.password);
      
      if (result.success) {
        setError('');
        navigate('/');
      } else {
        setError(result.error || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          {user ? (
            // Show sign-out interface when user is logged in
            <>
              <h2>Welcome back!</h2>
              <p>You are currently logged in as: <strong>{user.email}</strong></p>
              {error && <div className="error-message">{error}</div>}
              
              <button 
                onClick={handleSignOut}
                className="login-button signout-button"
                disabled={loading}
              >
                {loading ? 'Signing out...' : 'Sign Out'}
              </button>
              
              <div className="signup-link">
                <Link to="/" className="signup-button">
                  Go to Home
                </Link>
              </div>
            </>
          ) : (
            // Show login form when user is not logged in
            <>
              <h2>Login</h2>
              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Your email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                    className={error && !formData.email ? 'error-input' : ''}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Your password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    disabled={loading}
                    className={error && !formData.password ? 'error-input' : ''}
                  />
                </div>

                <button 
                  type="submit" 
                  className="login-button"
                  disabled={loading || !formData.email.trim() || !formData.password}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="signup-link">
                <Link to="/signup" className="signup-button">
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
