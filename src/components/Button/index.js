import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function Button({ children, type, disabled, className, onClick }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} disabled={disabled} onClick={onClick} className={cn(className, styles.button)}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
