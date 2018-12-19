import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectError } from '../../redux/reducers/user';
import {
  addContact,
  emptyFormError,
  clearErrors,
} from '../../redux/reducers/user/actions';
import { Link } from 'react-router-dom';
import { isEmpty, createNewContactFrom } from '../../helpers';
import Form from '../common/form';
import InputField from '../common/input-field';

class AddContact extends Component {
  state = {
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
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

    const newContact = createNewContactFrom(this.state);

    this.props.addContact(newContact, this.props.history);
  };

  render() {
    const { error } = this.props;

    return (
      <div className="form-container">
        <Link to="/contacts" className="form__button--back">
          <i className="fas fa-arrow-circle-left" />
          Back to Contacts
        </Link>
        <Form title="Add Contact" onSubmit={this.onSubmit}>
          <InputField
            label="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
          />
          <InputField
            label="Middle Name"
            name="middleName"
            placeholder="(Optional)"
            value={this.state.middleName}
            onChange={this.onChange}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
          <InputField
            label="Phone"
            name="phone"
            value={this.state.phone}
            onChange={this.onChange}
          />
          <InputField
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <InputField
            label="Line 1"
            name="line1"
            value={this.state.line1}
            onChange={this.onChange}
          />
          <InputField
            label="Line 2"
            name="line2"
            placeholder="(Optional)"
            value={this.state.line2}
            onChange={this.onChange}
          />
          <InputField
            label="City"
            name="city"
            value={this.state.city}
            onChange={this.onChange}
          />
          <InputField
            label="State"
            name="state"
            value={this.state.state}
            onChange={this.onChange}
          />
          <InputField
            label="Zip"
            name="zip"
            value={this.state.zip}
            onChange={this.onChange}
          />
          {error && <div className="form__error">{error.msg}</div>}
          <button className="form__submit">Submit</button>
        </Form>
      </div>
    );
  }
}

AddContact.propTypes = {
  error: PropTypes.shape({ error: PropTypes.string }),
  addContact: PropTypes.func.isRequired,
  emptyFormError: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  selectError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: selectError(state),
});

export default connect(
  mapStateToProps,
  { addContact, emptyFormError, selectError, clearErrors }
)(AddContact);
