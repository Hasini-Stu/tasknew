import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../firebase/auth';
import SuccessMessage from './SuccessMessage';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (formData.firstName.trim().length < 2) {
      setError('First name must be at least 2 characters long');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (formData.lastName.trim().length < 2) {
      setError('Last name must be at least 2 characters long');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password.length > 128) {
      setError('Password must be less than 128 characters');
      return false;
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password
      });
      
      if (result.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Create a DEV@Deakin Account</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <SuccessMessage message={success} />}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                disabled={loading}
                className={error && !formData.firstName.trim() ? 'error-input' : ''}
                minLength="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                disabled={loading}
                className={error && !formData.lastName.trim() ? 'error-input' : ''}
                minLength="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={loading}
                className={error && !formData.email.trim() ? 'error-input' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                minLength="6"
                maxLength="128"
                disabled={loading}
                className={error && !formData.password ? 'error-input' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                minLength="6"
                maxLength="128"
                disabled={loading}
                className={error && !formData.confirmPassword ? 'error-input' : ''}
              />
            </div>

            <button 
              type="submit" 
              className="create-button"
              disabled={loading || !formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword}
            >
              {loading ? 'Creating Account...' : 'Create'}
            </button>
          </form>

          <div className="login-link">
            <p>Already have an account? <Link to="/login" className="login-link-text">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
