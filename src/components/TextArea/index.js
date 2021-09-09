import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

function TextArea({ input, id, theme }) {
  return <textarea {...input} id={id} className={cn(theme)} />;
}

TextArea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

TextArea.defaultProps = {
  className: ''
};

export default TextArea;
