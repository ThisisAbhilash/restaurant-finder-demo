import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, type, disabled, className }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={classnames(className)}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default Button;