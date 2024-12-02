import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const UserBlogApiEndPoint = "http://127.0.0.1:8000/accounts/user-blogs/";
  const MyBlogApiEndpoint = 'http://127.0.0.1:8000/accounts/my-blogs/';

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(UserBlogApiEndPoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire('Error', 'Failed to load blogs', 'error');
      }
    };

    fetchBlogs();
  }, [loading]);

  const handleDelete = async (blogId) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "This action can't be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`${MyBlogApiEndpoint}${blogId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      } catch (error) {
        Swal.fire('Error', 'Failed to delete blog', 'error');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Blogs History</h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : blogs.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: 'gray' }}>
          No blogs posted yet.
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Title</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Content</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{blog.title}</td>
                <td style={{ border: '1px solid #ddd', textAlign:'justify',padding: '10px' }}>{blog.content}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                  <FaEdit
                    style={{
                      cursor: 'pointer',
                      marginRight: '10px',
                      color: '#4CAF50',
                    }}
                    onClick={() => navigate(`/edit/${blog.id}`)} 
                  />
                  <FaTrash
                    style={{
                      cursor: 'pointer',
                      color: 'red',
                    }}
                    onClick={() => handleDelete(blog.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
