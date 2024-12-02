import React from 'react'

export default function Bio({data}) {
  const {bio}= data;
  return (
    <div style={{textAlign:'center'}}>
      <p><strong>Bio:</strong> {bio? bio:'No bio available'}</p>
    </div>
  )
}
