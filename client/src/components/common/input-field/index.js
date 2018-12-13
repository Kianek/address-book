import React from 'react';
import PropTypes from 'prop-types';

import './InputField.scss';

function InputField({ type, label, name, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      {label && (
        <React.Fragment>
          <label className="input-field__label">{label}:</label>
          <br />
        </React.Fragment>
      )}
      <input
        className="input-field"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

InputField.defaultProps = {
  type: 'text',
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default InputField;
