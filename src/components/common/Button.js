import React, { PropTypes } from 'react';

import Icon from './Icon';

const styles = {
  button: {
    padding: 15,
    fontSize: 16,
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'uppercase',
    backgroundColor: '#0291E8',
    color: '#FFFFFF',
    border: 0,
    borderRadius: 2,
    cursor: 'pointer',
    minWidth: 120,
  },
  iconBefore: {
    marginRight: 10,
  },
  iconAfter: {
    marginLeft: 10,
  },
};

const Button = ({ icon, iconPosition = 'before', disabled, label, style, ...props }) => (
  <button
    style={{
      ...styles.button,
      ...style,
    }}
    disabled={disabled}
    {...props}
  >
    {icon && iconPosition === 'before' && (
      <Icon
        name={icon}
        style={label ? styles.iconBefore : {}}
      />
    )}

    {label}

    {icon && iconPosition === 'after' && (
      <Icon
        name={icon}
        style={label ? styles.iconAfter : {}}
      />
    )}
  </button>
);

Button.propTypes = {
  /**
   * The icon to show along with the Button's `label`.
   */
  icon: PropTypes.string,
  /**
   * The position of which the icon will be shown.
   */
  iconPosition: PropTypes.oneOf(['before', 'after']),
  /**
   * Text to show inside of button.
   */
  label: PropTypes.string,
  /**
   * Whether this button is on disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * Custom button style.
   */
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Button;
