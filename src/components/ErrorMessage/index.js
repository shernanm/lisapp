import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function ErrorMessage({ error }) {
  return (
    !!error && (
      <div className={styles.container}>
        <h3 className={styles.error}>{error}</h3>
      </div>
    )
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string
};

export default ErrorMessage;
