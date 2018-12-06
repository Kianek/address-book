import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.scss';

function Navbar(props) {
  if (props.isAuthenticated) {
    return (
      <nav className="navbar">
        <Link to="/contacts" className="navbar__branding">
          Address Book
        </Link>
        <Link to="/" className="navbar__link">
          Logout
        </Link>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__branding">
        Address Book
      </Link>
      <Link to="/register" className="navbar__link">
        Register
      </Link>
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
