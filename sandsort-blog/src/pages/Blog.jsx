import React from 'react';
import NavBar from '../components/NavBar';
import BlogModal from '../components/Blog_Modal'
import BlogButton from '../components/BlogButton'


export default function Blog() {
  return (
    <div>
      <NavBar/>
      <BlogButton text="New Blog"/>
      <BlogModal/>
    </div>
  )
}
