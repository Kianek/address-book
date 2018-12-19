import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editContact,
  emptyFormError,
  clearErrors,
} from '../../redux/reducers/user/actions';
import { loadCurrentContact, selectError } from '../../redux/reducers/user';
import { isEmpty, createNewContactFrom } from '../../helpers';
import Form from '../common/form';
import InputField from '../common/input-field';

class EditContact extends Component {
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

  componentDidMount() {
    const { name, phone, email, address } = this.props.currentContact;

    this.setState({
      firstName: name.first,
      middleName: name.middle,
      lastName: name.last,
      phone,
      email,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  }

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

    // The backend API searches the database by id
    // to find the proper contact to update
    newContact._id = this.props.match.params.id;

    this.props.editContact(newContact, this.props.history);
  };

  render() {
    const { error } = this.props;

    return (
      <div className="form-container">
        <Link to="/contacts" className="form__button--back">
          <i className="fas fa-arrow-circle-left" />
          Back to Contacts
        </Link>
        <Form title="Edit Contact" onSubmit={this.onSubmit}>
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

EditContact.propTypes = {
  currentContact: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      middle: PropTypes.string,
      last: PropTypes.string.isRequired,
    }).isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      line1: PropTypes.string.isRequired,
      line2: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  editContact: PropTypes.func.isRequired,
  loadCurrentContact: PropTypes.func.isRequired,
  emptyFormError: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentContact: loadCurrentContact(state),
  error: selectError(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    { editContact, loadCurrentContact, emptyFormError, clearErrors }
  )(EditContact)
);
