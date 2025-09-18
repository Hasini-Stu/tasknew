import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewPost from './components/NewPost';
import './App.css';

const Home = () => {
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
      <Header />
      <Hero />
      <FeaturedArticles />
      <FeaturedTutorials />
      <div className="newsletter-section">
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <label htmlFor="email">SIGN UP FOR OUR DAILY INSIDER</label>
          <input type="email" name="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 