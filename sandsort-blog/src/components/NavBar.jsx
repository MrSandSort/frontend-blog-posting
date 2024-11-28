import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "../css-file/navbar.css";
import logo from "../images/sandsort-blog.png";

export default function NavBar() {

  const navigate= useNavigate();
  const isLoggedIn= !!localStorage.getItem("authToken");

  const handleLogout=()=>
    {
      localStorage.removeItem("authToken");
      navigate("/login");
    }


  return (
    <div className="navbar">

      <div className="Logo">

        <Link to="/">
          <img src={logo} alt="Logo" height={70} width={70}></img>
        </Link>

      </div>

      <div className="navList">

        <Link to="/" className="navItems">
          Home
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="navItems">
              Login
            </Link>
            <Link to="/register" className="navItems">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/blogs" className="navItems">
               Blogs
            </Link>
         
            <Link to="/" className="navItems" onClick={handleLogout}>
              Logout
            </Link>
            
          </>
        )}
      </div>
    </div>
  );
}
