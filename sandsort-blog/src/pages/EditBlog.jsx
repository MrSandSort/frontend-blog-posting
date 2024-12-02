import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditBlog() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  
  const MyBlogApiEndpoint = 'http://127.0.0.1:8000/accounts/my-blogs/';

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${MyBlogApiEndpoint}${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire('Error', 'Failed to load blog details', 'error');
        navigate('/'); 
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      await axios.put(
        `${MyBlogApiEndpoint}${id}/`,
        blog,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire('Success', 'Blog updated successfully', 'success');
      navigate('/user-blogs'); 
    } catch (error) {
      Swal.fire('Error', 'Failed to update blog', 'error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Edit Blog</h1>
      {!loading ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              style={{ width: '100%', padding: '10px' }}
              rows="5"
            ></textarea>
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Save Changes
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
