import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducers/auth/actions';
import Form from '../common/form/Form';
import InputField from '../common/input-field';

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
    console.log('submitting');
  };
  render() {
    return (
      <div className="login-container">
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
            {/* TODO: Add invalid creds error handling */}
            <button className="login__button">Submit</button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { login }
)(Login);