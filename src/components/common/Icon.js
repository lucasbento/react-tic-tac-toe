import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const Icon = ({ name, ...props }) => (
  <FontAwesome
    name={name}
    {...props}
  />
);

Icon.propTypes = {
  /**
   * The name of the icon.
   */
  name: PropTypes.string.isRequired,
};

export default Icon;

