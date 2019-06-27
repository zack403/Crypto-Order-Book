import React from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom"

const Navbar = () => {
    return (
        <Router>
        <nav className="navbar  navbar-expand-lg navbar-dark  bg-dark">
        <Link className="navbar-brand" to="/">
          Crypto Order Book App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </nav>
      </Router>
    );
}

export default Navbar;