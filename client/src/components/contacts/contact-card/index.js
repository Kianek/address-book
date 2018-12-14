import React from 'react';
import { Link } from 'react-router-dom';

import './ContactCard.scss';

function ContactCard(props) {
  const { name, phone, email, address, _id, onEditClick } = props;
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
        <button className="contact-card__btn--delete">
          <i className="fas fa-times" />
        </button>
      </div>
      <h3 className="heading">Contact</h3>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>
      <h3 className="heading">Address</h3>
      <div className="street-address">
        <p>{address.line1}</p>
        <p>{address.line2}</p>
      </div>
      <div className="city-state-zip">
        <p>City: {address.city}</p>
        <p>State: {address.state}</p>
        <p>Zip: {address.zip}</p>
      </div>
    </li>
  );
}

export default ContactCard;
