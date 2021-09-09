import React, { useState } from 'react';
import ReactSelect from 'react-select';

function Select({ input, options }) {
  const [selected, setSelected] = useState({});
  const handleValue = (select) => {
    setSelected(select);
    input.onChange(select.value);
  };
  return <ReactSelect value={selected} onChange={handleValue} options={options} />;
}

export default Select;
