import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Details from './Details';
import Bio from './Bio';

export default function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const [userBio, setUserBio] = useState(null);

  const profileApi = 'http://127.0.0.1:8000/accounts/profile/';
  const BioApi = 'http://127.0.0.1:8000/accounts/user-profile/';

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axios
      .get(profileApi, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => setProfileData(response.data))
      .catch((error) => console.error('Error fetching profile:', error));

    axios
      .get(BioApi, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => setUserBio(response.data))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, []);

  const handleEditProfile = () => {
    window.location.href = '/edit-profile'; 
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          width: '80%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
      >
        {profileData && <Details data={profileData} />}
      </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          width: '80%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
      >
        {userBio && <Bio data={userBio} />}
      </div>
      <button
        onClick={handleEditProfile}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#087A1291', 
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Edit Profile
      </button>
    </div>
  );
}
