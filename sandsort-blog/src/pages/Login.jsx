import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        formData
      );
     
      console.log(response)
      const token = response.data.access;
      localStorage.setItem("authToken", token);
      

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You will be redirected to the blogs page.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/blogs"); 
      }, 2000);

      setFormData({ username: "", password: "" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: err.response ? err.response.data.error : "Failed to login!",
      });
    }
  };

  return (
    <>
      <NavBar />

      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <h2 style={styles.heading}>Login</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f7f9fc",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#333",
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    marginBottom: "0.5rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
};
