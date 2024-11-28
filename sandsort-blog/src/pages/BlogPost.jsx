import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';


export default function BlogModal() {

  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate= useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Please log in to post a blog.',
      });
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/accounts/blogs/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Blog Posted',
        text: 'Your blog was successfully posted!',
      });

      navigate('/blogs')

      setFormData({ title: '', content: '' }); 
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.detail || 'Failed to post the blog.',
      });
    }
  };

  return (
    <>
      <NavBar />

      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <h2 style={styles.heading}>Post a New Blog</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '1.5rem',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
};
