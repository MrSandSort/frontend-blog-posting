import React from 'react';
import NavBar from '../components/NavBar';
import Blog_Modal from '../components/Blog_Modal'
import Blog_Button from '../components/BlogButton'


export default function Blog() {
  return (
    <div>
      <NavBar/>
      <Blog_Button text="New Blog"/>
      <Blog_Modal/>
    </div>
  )
}
