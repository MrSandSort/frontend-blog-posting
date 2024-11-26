import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../css-file/navbar.css";
import logo from "../images/sandsort-blog.png";

export default function NavBar() {
  return (
    <div className="navbar">

      <div className="Logo">

        <Link to="Home">
          <img src={logo} alt="Logo" height={70} width={70}></img>
        </Link>

      </div>

      <div className="navList">

        <Link to="Home" className="navItems">
          Home
        </Link>
        <Link href="" className="navItems">
          Blogs
        </Link>
        <Link href="" className="navItems">
          Login
        </Link>
        <Link href="" className="navItems">
          Logout
        </Link>
        <Link href="" className="navItems">
          Register
        </Link>

      </div>
    </div>
  );
}
