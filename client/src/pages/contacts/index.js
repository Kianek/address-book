import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isContactsEmpty,
  selectAllContacts,
  isLoading,
  loadCurrentContact,
} from '../../redux/reducers/user';
import {
  fetchContacts,
  getContact,
  deleteAll,
} from '../../redux/reducers/user/actions';
import { Link } from 'react-router-dom';
import ContactCard from './contact-card';
import Loading from '../../components/common/spinner';

import './Contacts.scss';

class Contacts extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  format = contacts =>
    contacts.map(contact => (
      <ContactCard
        key={contact._id}
        onEditClick={this.props.getContact}
        {...contact}
      />
    ));

  render() {
    const { contacts, isContactsEmpty, isLoading } = this.props;

    return (
      <div className="contacts">
        <h1 className="contacts__heading">Contacts</h1>
        <div className="contacts__controls">
          <Link to="/add" className="contacts__controls__button--add">
            <i className="fas fa-plus" /> Add
          </Link>
          <button
            onClick={this.props.deleteAll}
            className="contacts__controls__button--delete-all"
          >
            <i className="fas fa-times" /> Delete All
          </button>
        </div>
        <ul className="contacts__list">
          {isLoading ? (
            <Loading />
          ) : isContactsEmpty ? (
            <div className="contacts__list__message">No contacts yet</div>
          ) : (
            this.format(contacts)
          )}
        </ul>
      </div>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
  isContactsEmpty: PropTypes.bool.isRequired,
  fetchContacts: PropTypes.func.isRequired,
  getContact: PropTypes.func.isRequired,
  loadCurrentContact: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  contacts: selectAllContacts(state),
  isContactsEmpty: isContactsEmpty(state),
  isLoading: isLoading(state),
});

export default connect(
  mapStateToProps,
  { fetchContacts, getContact, loadCurrentContact, deleteAll }
)(Contacts);
