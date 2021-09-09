import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';

import 'firebase/auth';
import { apiSetup } from '../../config/api';
import store from '../../redux/store';
import sessionActions from '../../redux/Auth/actions';

import Routes from '../Routes';

import '../../scss/application.scss';

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSession = useCallback(
    (user, session) => {
      dispatch(sessionActions.setCurrentUser(user));
      dispatch(sessionActions.setStateSession(session));
    },
    [dispatch]
  );

  useEffect(() => {
    apiSetup(store.dispatch);
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, photoURL, refreshToken, uid } = user;
        handleSession({ displayName, email, photoURL, refreshToken, uid }, true);
        setLoading(false);
      } else {
        handleSession(null, false);
        setLoading(false);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [handleSession]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Router>
      <Routes />
    </Router>
  );
}

App.defaultProps = {
  loading: false
};

export default App;
