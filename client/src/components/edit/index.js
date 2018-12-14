import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editContact } from '../../redux/reducers/user/actions';
import { loadCurrentContact } from '../../redux/reducers/user';
import { Link, withRouter } from 'react-router-dom';
import '../../App.scss';
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

    const {
      firstName,
      middleName,
      lastName,
      phone,
      email,
      line1,
      line2,
      city,
      state,
      zip,
    } = this.state;
    const newContact = {
      _id: this.props.match.params.id,
      name: {
        first: firstName,
        middle: middleName,
        last: lastName,
      },
      phone,
      email,
      address: {
        line1,
        line2,
        city,
        state,
        zip,
      },
    };

    this.props.editContact(newContact, this.props.history);
  };

  render() {
    return (
      <div className="add-contact-page">
        <div className="form-container">
          <Link to="/contacts" className="btnBack">
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
            <button className="form__submit">Submit</button>
          </Form>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  editContact: PropTypes.func.isRequired,
  loadCurrentContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentContact: loadCurrentContact(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    { editContact, loadCurrentContact }
  )(EditContact)
);
