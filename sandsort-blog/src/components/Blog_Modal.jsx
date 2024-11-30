import React, { useEffect, useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa'; 
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



export default function Blog_Modal() {

  const [blogs, setBlogs]= useState([]);
  const navigate= useNavigate();


  useEffect(()=>
  {
      const fetchBlogs= async ()=>
        {
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            Swal.fire({
              icon: "warning",
              title: "Unauthorized",
              text: "Please log in to view blogs.",
            }).then(() => {
             navigate('/login'); 
            });
            return;
            
          }
          try{
            const response= await axios.get('http://127.0.0.1:8000/accounts/blogs/',
              
            {
              headers:{
                Authorization:`Bearer ${authToken}`
              }
            }
            );

            setBlogs(response.data);
          

          }catch(err)
          {
            const errorMessage = err.response
          ? err.response.data.detail
          : "Failed to fetch blogs";
             Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
              })

          }

        };

        fetchBlogs();

    },[navigate])

  return (

    <div>
      
    {blogs.length > 0 ? (

      blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog-modal"
          style={{
            padding: '1rem',
            border: '2px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '1rem auto ',
            maxWidth: '65rem',
            backgroundColor: 'rgb(245, 247, 248)',
          }}
        >
      
          <div className="blog-title" style={{ marginBottom: '0.5rem' }}>
           
            <h3 style={{ margin: 0, textAlign:'center',fontSize: '1.5rem', color: '#333', fontFamily:'fantasy' }}>{blog.title}</h3>

            <p style={{
                margin: '0.5rem 0 0',
                fontSize: '0.9rem',
                color: '#888',
                textAlign:'center'
              }}
            >
            <strong>{blog.author}</strong> • {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </div>

          <div
            className="blog-content"
            style={{
              color: '#555',
              lineHeight: '1.6',
              marginBottom: '1rem',
              textAlign:'justify',
              
            }}
          >
            <p>{blog.content}</p>
          </div>

          <div
            className="blog-actions"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #eee',
              paddingTop: '0.5rem',
              color: '#777',
              fontSize: '0.9rem',
            }}
          >
            <div className="likes" style={{ display: 'flex', alignItems: 'center' }}>
              <FaHeart style={{ marginRight: '0.3rem', color: '#FF0A0AFF' }} />
              <span>{blog.likes} Likes</span>
            </div>

            <div className="comments" style={{ display: 'flex', alignItems: 'center' }}>
              <FaComment style={{ marginRight: '0.3rem', color: '#1C55D8FF' }} />
              <span>{blog.comments_count} Comments</span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>Loading blogs...</p>
    )}
  </div>
);
}
   
