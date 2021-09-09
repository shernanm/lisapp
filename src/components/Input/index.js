import React from 'react';
import cn from 'classnames';

function Input({ input, type, autocomplete, id, theme, placeholder }) {
  return (
    <input
      {...input}
      id={id}
      className={cn(theme)}
      autoComplete={autocomplete}
      placeholder={placeholder}
      type={type}
    />
  );
}
export default Input;
