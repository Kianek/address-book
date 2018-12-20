import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectAuthStatus } from '../../redux/reducers/auth';
import { deleteAccount } from '../../redux/reducers/user/actions';
import { logout } from '../../redux/reducers/auth/actions';

import './Navbar.scss';

function Navbar({ isAuthenticated, logout, deleteAccount }) {
  if (isAuthenticated) {
    return (
      <nav className="navbar">
        <Link to="/contacts" className="navbar__branding">
          Address Book
        </Link>
        <Link to="/" className="navbar__link" onClick={deleteAccount}>
          Delete Account
        </Link>
        <Link to="/" className="navbar__link" onClick={logout}>
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

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: selectAuthStatus(state),
});

export default connect(
  mapStateToProps,
  { logout, selectAuthStatus, deleteAccount }
)(Navbar);
