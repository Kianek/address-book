import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteContact } from '../../../redux/reducers/user/actions';

import './ContactCard.scss';

function ContactCard({
  name,
  phone,
  email,
  address,
  _id,
  onEditClick,
  deleteContact,
}) {
  const fullName = `${name.first} ${name.middle ? name.middle : ''} ${
    name.last
  }`;
  return (
    <li className="contact-card">
      <div className="contact-card__header">
        <h2 className="contact-card__name">{fullName}</h2>
        <Link
          to={`/${_id}/edit`}
          className="contact-card__btn--edit"
          onClick={onEditClick.bind(this, _id)}
        >
          <i className="fas fa-edit" />
        </Link>
        <button
          onClick={deleteContact.bind(this, _id)}
          className="contact-card__btn--delete"
        >
          <i className="fas fa-times" />
        </button>
      </div>
      <h3 className="heading">Contact</h3>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>
      <h3 className="heading">Address</h3>
      <div className="street-address">
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
      </div>
      <div className="city-state-zip">
        <p>City: {address.city}</p>
        <p>State: {address.state}</p>
        <p>Zip: {address.zip}</p>
      </div>
    </li>
  );
}

ContactCard.propTypes = {
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
  }),
  _id: PropTypes.string,
  onEditClick: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default connect(
  null,
  { deleteContact }
)(ContactCard);
