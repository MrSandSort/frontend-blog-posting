import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../css-file/navbar.css";
import logo from "../images/sandsort-blog.png";

export default function NavBar() {

  const [showLogoutModal, setShowLogoutModal]= useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setShowLogoutModal(false);
    navigate("/login");
  };

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
        <Link to="/blogs" className="navItems">
          Blogs
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
            <Link to="#" className="navItems" onClick={()=>{setShowLogoutModal(true)}}>
              Logout
            </Link>
          </>
        )}
      </div>
       <Modal show={showLogoutModal} onHide={()=> setShowLogoutModal(false)} centered>

        <Modal.Header closeButton>

          <Modal.Title> </Modal.Title>
          <Modal.Body>Are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShowLogoutModal(false)}> Cancel </Button>
            <Button variant="danger" onClick={handleLogout}>
             Logout
          </Button>
          </Modal.Footer>

        </Modal.Header>



      </Modal>
    </div>
  );
}
