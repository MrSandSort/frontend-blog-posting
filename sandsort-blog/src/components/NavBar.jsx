import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "../css-file/navbar.css";
import logo from "../images/sandsort-blog.png";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

export default function NavBar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setShowLogoutModal(false);
    setUsername(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await axios.get(
            "http://127.0.0.1:8000/accounts/profile/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsername(response.data.username);
        }
      } catch (error) {
        console.log("Data is not fetched properly");
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <div className="navbar">
      <div className="Logo">
        <Link to="/">
          <img src={logo} alt="Logo" height={70} width={70} />
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
            <div className="usernameDisplay">
                <p>Hi, {username}</p>
            </div>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="profile-dropdown"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "0",
                }}
              >
                <CgProfile size={28} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/view-profile">
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/edit-profile">
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/user-blogs">
                  Your Blogs
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => setShowLogoutModal(true)}
                  style={{ color: "red" }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           
          </>
        )}
      </div>

      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
          <Modal.Body>Are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </div>
  );
}
