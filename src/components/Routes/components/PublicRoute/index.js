import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route {...rest} render={(props) => (authed ? <Redirect to="/home" /> : <Component {...props} />)} />
  );
}

PublicRoute.propTypes = {
  authed: PropTypes.bool.isRequired,
  component: PropTypes.elementType
};

export default PublicRoute;
