import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

// Styles
import "../Styles/dist/Header.css";

function Header({ title }) {

  // USER OBJECT
  const [ user, setUser ] = React.useState({
    username: ''
  });

  const _id = localStorage.getItem('_id');
  const token = localStorage.getItem('token');

  React.useEffect(() => {

    // GETTING THE USER

    if(token){
      axios.get(`http://localhost:5000/api/users/user/${_id}`)
        .then(response => {
          setUser({ username: response.data.username });
        })
        .catch(err => console.log(err));
    }

  }, [token, _id]);

  const mql = window.matchMedia("(max-width: 600px)");
  let phoneView = mql.matches;

  if (!phoneView) {
    return (
      <nav className="nav-bar">
        <h2>{title}</h2>
        <ul className="nav">
          <Link style={{ textDecoration: "none" }} to="/">
            <li>Home</li>
          </Link>

          {
            token ? (
              <Link style={{ textDecoration: "none" }} to="/download">
                <li>Download</li>
              </Link>
            ) : ( 
              <Link style={{ textDecoration: "none" }} to="/login">
                <li>Download</li>
              </Link>
            )
          }

          {
            token ? (
              <Link style={{ textDecoration: "none" }} to="/subscriptions">
                <li>Subscriptions</li>
              </Link>
            ) : ( 
              <Link style={{ textDecoration: "none" }} to="/login">
                <li>Subscriptions</li>
              </Link>
            )
          }

          {
            _id ? (
              <Link style={{ textDecoration: "none" }} to={`/settings/${_id}`}>
                <button id="signup-button">Hello, {user.username}</button>
              </Link>
            ) : (
              <Link style={{ textDecoration: "none" }} to="/signup">
                <button id="signup-button">Signup</button>
              </Link>
            )
          }

        </ul>
      </nav>
    );
  } else {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ background: "#000", color: "#fff" }}
      >
        <Navbar.Brand href="/" style={{ color: "#fff" }}>
          {title}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ backgroundColor: "#fff" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" style={{ color: "#fff" }}>
              Home
            </Nav.Link>

            <Nav.Link href="/download" style={{ color: "#fff" }}>
              Download
            </Nav.Link>

            <Nav.Link href="/admin" style={{ color: "#fff" }}>
              Admin
            </Nav.Link>

            <Nav.Link href="/subscriptions" style={{ color: "#fff" }}>
              Subscriptions
            </Nav.Link>

            {
            _id ? (
              <Link style={{ textDecoration: "none" }} to={`/settings/${_id}`}>
                Welcome back, {user.username}
              </Link>
            ) : (
              <Link style={{ textDecoration: "none" }} to="/signup">
                <button id="signup-button">Signup</button>
              </Link>
            )
          }
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
