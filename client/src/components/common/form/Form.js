import React from 'react';
import PropTypes from 'prop-types';

import './Form.scss';

function Form(props) {
  const title = props.title;
  return (
    <form className="form" onSubmit={props.onSubmit}>
      {title && <h2 className="form__title">{title}</h2>}
      {props.children}
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
