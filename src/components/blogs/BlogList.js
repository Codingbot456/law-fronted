import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, likePost, getCategories, getPostsByCategory, createComment, getComments } from '../../services/api';
import './blogList.css'; // Import the CSS file
import { FaEdit, FaShareAlt, FaPaperPlane } from 'react-icons/fa'; // Import icons

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [filter, setFilter] = useState('newest'); // Default filter to 'newest'
  const [expandedPosts, setExpandedPosts] = useState({}); // State to manage expanded posts

  useEffect(() => {
    const fetchUserId = async () => {
      const userIdFromStorage = localStorage.getItem('userId');
      setUserId(userIdFromStorage);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = selectedCategory
          ? await getPostsByCategory(selectedCategory)
          : await getPosts();
        setPosts(response.data);
      } catch (error) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments();
        setComments(response.data);
      } catch (error) {
        setError('Failed to load comments.');
      }
    };
    fetchComments();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await likePost(postId);
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes: response.data.likes } : post
      ));
    } catch (error) {
      setError('Failed to like post.');
    }
  };

  const handleCommentChange = (e, postId) => {
    setNewComment({
      ...newComment,
      [postId]: e.target.value
    });
  };

  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    if (!userId) {
      setError('User not authenticated.');
      return;
    }
    try {
      const response = await createComment({
        post_id: postId,
        content: newComment[postId],
        user_id: userId
      });
      setComments([...comments, response.data]);
      setNewComment({
        ...newComment,
        [postId]: ''
      });
    } catch (error) {
      setError('Failed to submit comment.');
    }
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(url)
      .then(() => alert('Post link copied to clipboard!'))
      .catch(err => console.error('Failed to copy post link:', err));
  };

  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId]
    });
  };

  const toggleExpanded = (postId) => {
    setExpandedPosts({
      ...expandedPosts,
      [postId]: !expandedPosts[postId]
    });
  };

  const sortedPosts = () => {
    switch (filter) {
      case 'popular':
        return [...posts].sort((a, b) => b.likes - a.likes);
      case 'archived':
        return [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'newest':
      default:
        return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Newest first
    }
  };

  const filteredPosts = sortedPosts();

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="blog-list-container">
      <h1>Blog Posts</h1>
      <div className='blog-filters'>
        <div>
          <h2>Filter by Category</h2>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='filter-type'>
          <h2>Sort by</h2>
          <div className='filter-type-actions'>
            <button onClick={() => setFilter('newest')} className={`filter-button ${filter === 'newest' ? 'active-filter' : ''}`}>Newest</button>
            <button onClick={() => setFilter('popular')} className={`filter-button ${filter === 'popular' ? 'active-filter' : ''}`}>Popular</button>
            <button onClick={() => setFilter('archived')} className={`filter-button ${filter === 'archived' ? 'active-filter' : ''}`}>Archived</button>
          </div>
        </div>
      </div>
      {filteredPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        filteredPosts.map(post => {
          const postComments = comments.filter(comment => comment.post_id === post.id);
          const isExpanded = expandedPosts[post.id];

          return (
            <div key={post.id} className="post">
              <div className="post-header">
                <img
                  src={post.author_profile_image || '/default-avatar.png'}
                  alt={`${post.author_name}'s avatar`}
                  className="author-image"
                />
                <h2>{post.title}</h2>
                <Link to={`/edit/${post.id}`} className="edit-icon">
                  <FaEdit />
                </Link>
              </div>
              <p><strong>Author:</strong> {post.author_name}</p>
              <p><strong>Posted on:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
              <div>
                <p>
                  {isExpanded ? post.content : post.content.substring(0, 100) + '...'}
                </p>
                <button onClick={() => toggleExpanded(post.id)} className="read-more-button">
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
              <div className="images">
                {post.images && post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="post-image"
                  />
                ))}
              </div>
              <div className="actions">
                <button className="action-icon like-button" onClick={() => handleLike(post.id)}>👍</button>
                <button className="action-icon share-button" onClick={() => handleShare(post.id)}>
                  <FaShareAlt />
                </button>
                <button className="action-icon comment-button" onClick={() => toggleComments(post.id)}>
                  {showComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                </button>
                <p>{post.likes} likes</p>
                <p>{postComments.length} comments</p>
              </div>
              {showComments[post.id] && (
                <div className="comments-section">
                  <h3>Comments</h3>
                  <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="comment-form">
                    <div className="comment-form-container">
                      <img
                        src={userId ? `/path-to-user-image/${userId}.png` : '/default-avatar.png'}
                        alt="Your avatar"
                        className="commenter-image"
                      />
                      <textarea
                        value={newComment[post.id] || ''}
                        onChange={(e) => handleCommentChange(e, post.id)}
                        placeholder="Add a comment..."
                        className="comment-input"
                      />
                      <button type="submit" className="submit-comment-button">
                        <FaPaperPlane />
                      </button>
                    </div>
                  </form>
                  <div className="comments-list">
                    {postComments.map(comment => (
                      <div key={comment.id} className="comment">
                        <img
                          src={comment.user_image || '/default-avatar.png'}
                          alt={`${comment.user_name}'s avatar`}
                          className="commenter-image"
                        />
                        <div className="comment-content">
                          <p><strong>{comment.user_name}</strong>: {comment.content}</p>
                          <p><small>{new Date(comment.created_at).toLocaleDateString()}</small></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default BlogList;
