import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './NewPost.css';

const NewPost = () => {
  const [formData, setFormData] = useState({
    postType: 'article',
    title: '',
    image: '',
    abstract: '',
    articleText: '',
    tags: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        image: file.name
      }));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    try {
      setLoading(true);
      const storageRef = ref(storage, `images/${Date.now()}_${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({
        ...prev,
        image: downloadURL
      }));
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
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

    if (formData.postType === 'article') {
      if (!formData.abstract.trim()) {
        setError('Please enter an abstract for your article.');
        setLoading(false);
        return;
      }
      if (!formData.articleText.trim()) {
        setError('Please enter article text.');
        setLoading(false);
        return;
      }
    }

    if (!isAuthenticated) {
      setError('You must be logged in to create a post.');
      setLoading(false);
      return;
    }

    try {
      // Prepare post data
      const postData = {
        postType: formData.postType,
        title: formData.title.trim(),
        image: formData.image,
        abstract: formData.abstract.trim(),
        articleText: formData.articleText.trim(),
        tags: formData.tags.trim().split(',').map(tag => tag.trim()).filter(tag => tag),
        authorId: user.uid,
        authorEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'posts'), postData);
      
      console.log('Post created with ID:', docRef.id);
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
        <h1>New Post</h1>
        
        <form onSubmit={handleSubmit} className="new-post-form">
          <div className="form-group">
            <label>Select Post Type:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="postType"
                  value="question"
                  checked={formData.postType === 'question'}
                  onChange={handleChange}
                  disabled={loading}
                />
                Question
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="postType"
                  value="article"
                  checked={formData.postType === 'article'}
                  onChange={handleChange}
                  disabled={loading}
                />
                Article
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>What do you want to ask or share</label>
            <p className="form-description">
              You can create the post you want in here!
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter a descriptive title."
              disabled={loading}
              className={error && !formData.title.trim() ? 'error-input' : ''}
            />
          </div>

          <div className="form-group">
            <label>Add an image:</label>
            <div className="image-upload-container">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder=""
                disabled={loading}
                className="image-input"
              />
              <div className="image-buttons">
                <button 
                  type="button" 
                  onClick={handleBrowse}
                  className="browse-button"
                  disabled={loading}
                >
                  Browse
                </button>
                <button 
                  type="button" 
                  onClick={handleImageUpload}
                  className="upload-button"
                  disabled={loading}
                >
                  Upload
                </button>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="abstract">Abstract:</label>
            <textarea
              id="abstract"
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              placeholder="Enter a 1-paragraph abstract."
              rows="3"
              disabled={loading}
              className={error && !formData.abstract.trim() ? 'error-input' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="articleText">Article Text:</label>
            <textarea
              id="articleText"
              name="articleText"
              value={formData.articleText}
              onChange={handleChange}
              placeholder="Enter a 1-paragraph abstract."
              rows="8"
              disabled={loading}
              className={error && !formData.articleText.trim() ? 'error-input' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Please add up to 3 tags to describe what your article is about e.g., Java."
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button 
              type="submit" 
              className="post-button"
              disabled={loading || !formData.title.trim()}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
