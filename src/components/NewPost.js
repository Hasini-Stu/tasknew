import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NewPost.css';

const NewPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'article'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title.trim()) {
      setError('Please enter a title for your post.');
      setLoading(false);
      return;
    }

    if (!formData.content.trim()) {
      setError('Please enter content for your post.');
      setLoading(false);
      return;
    }

    if (!isAuthenticated) {
      setError('You must be logged in to create a post.');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Post created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Post creation error:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="new-post-container">
        <div className="new-post-content">
          <h1>Create New Post</h1>
          <div className="login-required">
            <p>You must be logged in to create a post.</p>
            <button onClick={() => navigate('/login')} className="login-button">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="new-post-container">
      <div className="new-post-content">
        <h1>Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="new-post-form">
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
              disabled={loading}
              className={error && !formData.title.trim() ? 'error-input' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="article">Article</option>
              <option value="tutorial">Tutorial</option>
              <option value="question">Question</option>
              <option value="discussion">Discussion</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content*</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Write your post content here..."
              rows="10"
              disabled={loading}
              className={error && !formData.content.trim() ? 'error-input' : ''}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="create-button"
              disabled={loading || !formData.title.trim() || !formData.content.trim()}
            >
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
