import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePostForm.css'; // Import the CSS file

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]); // State for categories
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [authorId, setAuthorId] = useState(null); // Initialize authorId as null

  useEffect(() => {
    const fetchUserId = () => {
      const userIdFromStorage = localStorage.getItem('userId');
      setAuthorId(userIdFromStorage);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/blog/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorId) {
      setError('User not authenticated.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', categoryId);
    formData.append('author_id', authorId);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post('http://localhost:4000/api/blog/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Post created successfully!');
        setTitle('');
        setContent('');
        setCategoryId('');
        setImages([]);
        setError('');
      }
    } catch (error) {
      setError('Failed to create post: ' + error.response.data.error);
    }
  };

  return (
    <div className="create-form">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category_id">Category</label>
          <select
            id="category_id"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="primary-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
