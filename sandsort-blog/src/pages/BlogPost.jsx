import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

export default function BlogModal() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(

        'http://localhost:8000/account/blogs/',
        formData,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );

      setSuccess('Blog posted successfully!');
      setFormData({ title: '', content: '' });
    } catch (err) {
      setError(err.response ? err.response.data.detail : 'Failed to post blog');
    }
  };

  return <>
    
    <NavBar/>
    <div style={styles.container}>

      <div style={styles.formWrapper}>

        <h2 style={styles.heading}>Post a New Blog</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

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

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  
  </>;
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
    maxWidth: '500px',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#333',
  },
  error: {
    color: '#e74c3c',
    marginBottom: '1rem',
  },
  success: {
    color: '#2ecc71',
    marginBottom: '1rem',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '1rem',
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
