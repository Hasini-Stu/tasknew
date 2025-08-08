import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import Footer from './components/Footer';
import './App.css';

function App() {
  const handleSubscribe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
      const response = await fetch('http://localhost:5001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Welcome email sent successfully! Check your inbox.');
        e.target.reset();
      } else {
        alert(`Error: ${data.error || 'Failed to send welcome email. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check if the server is running.');
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Articles Section */}
      <FeaturedArticles />
      
      {/* Featured Tutorials Section */}
      <FeaturedTutorials />
      
      {/* Newsletter Signup Section */}
      <div className="newsletter-section">
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <label htmlFor="email">SIGN UP FOR OUR DAILY INSIDER</label>
          <input type="email" name="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App; 