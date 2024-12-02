import React from 'react'

export default function Details({data}) {
  
  const {username,email}  = data;

  return (
    <div style={{textAlign:'center'}}>
    <h2>Nice Meeting you, {username} !!</h2>
    <p><strong>Username:</strong> {username}</p>
    <p><strong>Email:</strong> {email}</p>
  </div>
  )
}
