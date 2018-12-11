import React from 'react';

import './ContactCard.scss';

function ContactCard(props) {
  return (
    <li className="contact-card">
      <h2 className="heading">First Middle Last</h2>
      <p>Phone: 555-555-5555</p>
      <p>Email: cortez@williams.com</p>
      <h3 className="heading">Address</h3>
      <div className="street-address">
        <p>Line 1</p>
        <p>Line 2</p>
      </div>
      <div className="city-state-zip">
        <p>City:</p>
        <p>State:</p>
        <p>Zip:</p>
      </div>
    </li>
  );
}

export default ContactCard;
