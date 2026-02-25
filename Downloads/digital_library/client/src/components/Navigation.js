import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaSearch, FaUser, FaCog } from 'react-icons/fa';
import '../styles/Navigation.css';

function Navigation() {
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Navbar bg="dark" expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <FaBook className="me-2" />
          Digital Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/search" className="nav-link-custom">
              <FaSearch className="me-2" />
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/features" className="nav-link-custom">
              Features
            </Nav.Link>

            {isLoggedIn ? (
              <>
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin" className="nav-link-custom">
                    <FaCog className="me-2" />
                    Admin
                  </Nav.Link>
                )}
                <Dropdown className="ms-2">
                  <Dropdown.Toggle variant="outline-light" id="user-menu">
                    <FaUser /> {user.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/feedback">
                      Send Feedback
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom ms-2">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
