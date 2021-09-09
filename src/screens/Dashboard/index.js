import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Nabvar';
import Toolbar from '../../components/Toolbar';

import Routes from './components/Routes';
import styles from './styles.module.scss';

function Dashboard() {
  const isAuthed = useSelector((state) => state.auth.isAuthed);
  return (
    <div className={styles.containerApp}>
      <Navbar title="LISApp" />
      <Routes />
      <Toolbar />
    </div>
  );
}

export default Dashboard;
