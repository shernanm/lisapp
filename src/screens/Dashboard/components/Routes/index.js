import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { APP_ROUTES } from '../../../../constants/routes';
import Home from '../../screens/Home';
import NewPost from '../../screens/NewPost';
import Profile from '../../screens/Profile';
import Search from '../../screens/Search';
import Detail from '../../screens/Detail';

function Routes() {
  return (
    <Switch>
      <Route path={APP_ROUTES.HOME.path} exact component={Home} />
      <Route path={APP_ROUTES.NEWPOST.path} exact component={NewPost} />
      <Route path={APP_ROUTES.SEARCH.path} exact component={Search} />
      <Route path={APP_ROUTES.PROFILE.path} exact component={Profile} />
      <Route path={`${APP_ROUTES.DETAIL.path}/:id`} exact component={Detail} />
    </Switch>
  );
}

export default Routes;
