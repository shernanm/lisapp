import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';
import { TOOLBAR_ICONS } from './constants';

function Toolbar() {
  return (
    <div className={styles.container}>
      {Object.values(TOOLBAR_ICONS).map(({ path, icon: Component }) => (
        <div key={path} className={styles.itemContainer}>
          <NavLink
            to={path}
            className={`${styles.link}   ${styles.ripple}`}
            activeClassName={styles.linkActive}
          >
            <Component className={styles.icon} />
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Toolbar;
