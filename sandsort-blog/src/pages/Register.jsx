import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../css-file/register.css"
import NavBar from "../components/NavBar";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/accounts/register/", formData);
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have been registered successfully!",
      });

      setFormData({ username: "", email: "", password: "" });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.detail || "An error occurred. Please try again.",
      });
    }
  };

  return (
  <>
    <NavBar/>
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1em" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className='btnnn' type="submit">Register</button>
      </form>
    </div>
  </>
)};

export default RegisterForm;
