import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../redux/reducers/auth/actions';
import { selectLoginError, selectAuthStatus } from '../../redux/reducers/auth';

import Form from '../../components/common/form';
import InputField from '../../components/common/input-field';

import '../../App.scss';
import './Login.scss';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const credentials = {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    };
    this.props.login(credentials, this.props.history);
  };

  render() {
    return (
      <div className="login">
        <Form title="Login" onSubmit={this.onSubmit}>
          <InputField
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {this.props.error ? (
            <div className="login__error">Invalid email and/or password</div>
          ) : null}
          <button className="login__button">Submit</button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: selectAuthStatus(state),
  error: selectLoginError(state),
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
