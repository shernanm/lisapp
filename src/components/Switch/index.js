import React from 'react';

import styles from './styles.module.scss';

function Switch({ onClick, checked, message }) {
  return (
    <label className={styles.pureMaterialSwitch}>
      <input type="checkbox" checked={checked} onChange={onClick} />
      <span>
        <strong>{message}</strong>
      </span>
    </label>
  );
}

export default Switch;
