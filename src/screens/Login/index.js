import React from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../components/Footer';
import authActions from '../../redux/Auth/actions';

import styles from './styles.module.scss';

function Login() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(authActions.login());
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <button className={styles.button} onClick={handleLogin} type="button">
          Iniciar sesion con google
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
