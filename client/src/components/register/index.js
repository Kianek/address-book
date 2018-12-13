import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.scss';
import './Register.scss';
import Form from '../common/form/Form';
import InputField from '../common/input-field';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // TODO: check for invalid input
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password,
    };
    axios
      .post(`/api/users/register`, newUser)
      .then(this.props.history.replace('/'))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        <Link to="/" className="btnBack">
          <i className="fas fa-arrow-circle-left" />
          Back to Login
        </Link>
        <div className="form-container">
          <Form title="Register" onSubmit={this.onSubmit}>
            <InputField
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
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
            <InputField
              label="Confirm Password"
              type="password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
            />
            <button className="btnSubmit">Create Account</button>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default Register;
