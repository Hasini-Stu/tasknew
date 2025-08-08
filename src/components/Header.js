import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="header">
      <Container>
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <h1>DEV@Deakin</h1>
          </div>

          {/* Search Bar */}
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

          {/* Navigation Links */}
          <nav className="nav-links">
            <a href="#post" className="nav-link">Post</a>
            <a href="#login" className="nav-link">Login</a>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header; 