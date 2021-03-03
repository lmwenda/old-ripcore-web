import React from "react";
import { Link } from "react-router-dom";

import '../Styles/dist/Header.css';

function Header({ title }){
    return(
        <nav className="nav-bar">
            <h2>{title}</h2>
            <ul className="nav">
                <Link style={{textDecoration: 'none'}} to="/">
                    <li>Home</li>
                </Link>

                <Link style={{textDecoration: 'none'}} to="/download">
                    <li>Download</li>
                </Link>

                <Link style={{textDecoration: 'none'}} to="/admin">
                    <li>Admin</li>
                </Link>

                <Link style={{textDecoration: 'none'}} to="/subscriptions">
                    <li>Subscriptions</li>
                </Link>

                <Link style={{textDecoration: 'none'}} to="/signup">
                    <button id="signup-button">Signup</button>
                </Link>
            </ul>
        </nav>
    );
}

export default Header;