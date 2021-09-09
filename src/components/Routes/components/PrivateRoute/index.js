import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return <Route {...rest} render={(props) => (authed ? <Component {...props} /> : <Redirect to="/" />)} />;
}

PrivateRoute.propTypes = {
  authed: PropTypes.bool.isRequired,
  component: PropTypes.elementType
};

export default PrivateRoute;
