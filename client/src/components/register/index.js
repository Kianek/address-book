import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectError } from '../../redux/reducers/user';
import { clearErrors, emptyFormError } from '../../redux/reducers/user/actions';
import { isEmpty } from '../../helpers/';
import axios from 'axios';
import Form from '../common/form';
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

    if (isEmpty(this.state)) {
      this.props.emptyFormError();
      return;
    } else {
      this.props.clearErrors();
    }

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
    const { error } = this.props;

    return (
      <Fragment>
        <div className="form-container">
          <Link to="/" className="form__button--back">
            <i className="fas fa-arrow-circle-left" />
            Back to Login
          </Link>
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
            {error && <div className="form__error">{error.msg}</div>}
            <button className="form__submit">Create Account</button>
          </Form>
        </div>
      </Fragment>
    );
  }
}

Register.propTypes = {
  error: PropTypes.objectOf(PropTypes.string),
  selectError: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  emptyFormError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: selectError(state),
});

export default connect(
  mapStateToProps,
  {
    selectError,
    clearErrors,
    emptyFormError,
  }
)(Register);
