import React from 'react';

import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <h6 className={styles.footerTitle}>Developed by</h6>
      <h6 className={styles.footerTitle2}>Sebastian G., Camilo O., Santiago H., Camilo J.</h6>
    </footer>
  );
}

export default Footer;
