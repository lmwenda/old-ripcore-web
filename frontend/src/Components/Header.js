import React from "react";
import { Link } from "react-router-dom";

function Header({ title }){
    return(
        <nav>
            <h2>{title}</h2>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>

                <Link to="/download">
                    <li>Download</li>
                </Link>

                <Link to="/admin">
                    <li>Admin</li>
                </Link>

                <Link to="/signup">
                    <button>Signup</button>
                </Link>
            </ul>
        </nav>
    );
}

export default Header;