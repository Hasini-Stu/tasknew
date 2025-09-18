import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container } from 'semantic-ui-react';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, userProfile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <Container>
        <div className="header-content">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>DEV@Deakin</h1>
            </Link>
          </div>

          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
            </form>
          </div>

          <nav className="nav-links">
            <Link to="/new-post" className="nav-link">New Post</Link>
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="welcome-text">
                  Welcome, {userProfile?.firstName || user?.email}
                </span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header; 