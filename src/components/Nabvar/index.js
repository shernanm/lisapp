import React from 'react';
import { string } from 'prop-types';
import { useDispatch } from 'react-redux';

import filterActions from '../../redux/Filter/actions';
import { ReactComponent as Filter } from '../../assets/filter.svg';

import styles from './styles.module.scss';

function Navbar({ title }) {
  const dispatch = useDispatch();
  const handleShowFilters = () => dispatch(filterActions.showFilter(true));

  return (
    <div className={styles.navbar}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <Filter onClick={handleShowFilters} className={styles.filter} />
    </div>
  );
}

Navbar.propTypes = {
  title: string
};

export default Navbar;
