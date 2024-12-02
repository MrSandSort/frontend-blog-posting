import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaCheck, FaEdit } from "react-icons/fa"; // Import icons

const ProfileDashboard = () => {
  const [profileFormData, setProfileFormData] = useState({
    username: "",
    email: "",
  });
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const profileApiEndpoint = "http://127.0.0.1:8000/accounts/profile/";
  const bioApiEndpoint = "http://127.0.0.1:8000/accounts/user-profile/";

  const styles = {
    
    container: {
      display: "flex",
      justifyContent: "space-between",
      width: "70%", 
      margin: "50px auto",
      fontFamily: "'Roboto', sans-serif", 
    },
    formContainer: {
      width: "40%", 
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    },

    title: {
      fontSize: "22px", 
      color: "#333",
      fontWeight: "600",
      marginBottom: "15px",
    },
    subtitle: {
      fontSize: "16px", 
      color: "#555",
      marginBottom: "10px",
      fontWeight: "500",
    },

  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  inputFocus: {
    borderColor: "#007BFF", 
  },
  textareaFocus: {
    borderColor: "#28a745", 
  },
  
  button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px", 
      cursor: "pointer",
      fontWeight: "500",
      transition: "background-color 0.3s ease",
      display: "flex", 
      alignItems: "center",
      justifyContent: "center", 
    },

    successButton:{
      width: "100%",
      padding: "10px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px", 
      cursor: "pointer",
      fontWeight: "500",
      transition: "background-color 0.3s ease",
      display: "flex", 
      alignItems: "center",
      justifyContent: "center", 

    },

    textarea: {
      display: "block",
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      height: "100px",
    },
    icon: {
      marginRight: "8px",
    },
  };
  


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(profileApiEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfileFormData({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load profile data. Please try again.",
        });
      }
    };

    const fetchBio = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(bioApiEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBio(response.data.bio || "No bio!");
        setLoading(false);
      } catch (error) {
        setBio("No bio available yet"); 
        setLoading(false);
      }
    };

    fetchProfile();
    fetchBio();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(profileApiEndpoint, profileFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data)

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const method = bio === "No bio available yet" || bio === "No bio!" ? "post" : "put";
      const url = bioApiEndpoint;
  
      const response = await axios[method](
        url,
        { bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      Swal.fire({
        icon: "success",
        title: method === "post" ? "Bio Added" : "Bio Updated",
        text: `Your bio has been ${method === "post" ? "added" : "updated"} successfully!`,
      });
  
      setBio(response.data.bio);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save bio. Please try again.",
      });
      setLoading(false);
    }
  };
  

  return (
    <div style={styles.container}>

      <div style={styles.formContainer}>

        <div style={styles.title}>Edit Profile</div>

        <form onSubmit={handleProfileSubmit}>

          <div style={styles.subtitle}>Username</div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <FaUser style={styles.icon} />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={profileFormData.username}
              onChange={handleProfileChange}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = "#ccc"}
            />
          </div>

          <div style={styles.subtitle}>Email</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={profileFormData.email}
              onChange={handleProfileChange}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = "#ccc"}
            />
          </div>
          <button type="submit" style={styles.button}>
            <FaCheck style={styles.icon} /> Save Profile
          </button>
        </form>
      </div>

      
        {loading ? (
          <p>Loading bio...</p>
        ) : (
          <form onSubmit={handleBioSubmit}>

            <div style={styles.subtitle}>Your Bio</div>

            <textarea
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={styles.textarea}
              onFocus={(e) => e.target.style.borderColor = styles.textareaFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = "#ccc"}
            />

            <button type="submit" style={styles.successButton}>
              <FaEdit style={styles.icon} /> Update Bio
            </button>
          </form>
        )}
    </div>
  );
};

export default ProfileDashboard;
