import React from 'react';
import { FaHeart, FaComment } from 'react-icons/fa'; 


export default function Blog_Modal() {
  return (
 
    <div 
      className="blog-modal" 
      style={{
        padding: '1rem', 
        border: '2px solid #ccc', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        margin: '1rem', 
        maxWidth: '65rem', 
        backgroundColor: 'rgb(245, 247, 248)'
      }}
    >
      <div className="blog-title" style={{ marginBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
          Growing Attitude
        </h4>
        <p style={{
          margin: '0.5rem 0 0',
          fontSize: '0.9rem',
          color: '#888'
        }}>
          <strong> Sandesh Paudel </strong> • November 26, 2024
        </p>
      </div>
    

      <div className="blog-content" 
      style=
      {{ color: '#555', 
      lineHeight: '1.6', 
      marginBottom: '1rem', 
      textAlign:'justify' }}>
        <p>
        Cultivating a growing attitude involves setting clear goals, learning from failures, and celebrating progress, no matter how small. Surrounding yourself with positivity, practicing gratitude, and embracing change are crucial steps in maintaining this mindset. Investing in personal growth whether through self care, acquiring new skills, or pursuing hobbies further reinforces the ability to evolve and thrive.Examples of a growing attitude are all around us. From innovators like Thomas Edison, who turned countless failures into groundbreaking inventions, to everyday individuals adapting to new challenges, this mindset demonstrates the transformative power of perseverance. Whether it is overcoming adversity, learning new skills, or striving for personal excellence, adopting a growing attitude leads to a more fulfilling and successful life.
        </p>
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
          fontSize: '0.9rem'
        }}>

        <div className="likes" style={{ display: 'flex', alignItems: 'center' }}>
          <FaHeart style={{ marginRight: '0.3rem', color: '#e74c3c' }} />
          <span>12 Likes</span>
        </div>

        <div className="comments" style={{ display: 'flex', alignItems: 'center' }}>
          <FaComment style={{ marginRight: '0.3rem', color: '#3498db' }} />
          <span>5 Comments</span>

        </div>
      </div>
    </div>
    

  )
}
