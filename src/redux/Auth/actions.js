import { completeTypes, createTypes } from 'redux-recompose';

import authService from '../../services/AuthServices';

/* ------------- Auth actions ------------- */
export const actions = createTypes(
  completeTypes({ primaryActions: ['LOGIN'], ignoredActions: ['SET_VALUES', 'IS_AUTHED', 'SIGN_OUT'] }),
  '@@AUTH'
);

const actionCreators = {
  login: () => async (dispatch) => {
    try {
      const response = await authService.login();
      if (response) {
        const { displayName, email, photoURL, refreshToken, uid } = response.user;

        dispatch({
          type: actions.IS_AUTHED,
          target: 'isAuthed',
          payload: true
        });

        dispatch({
          type: actions.SET_VALUES,
          target: 'user',
          payload: { displayName, email, photoURL, refreshToken, uid }
        });
      }
    } catch (error) {
      dispatch({
        type: actions.LOGIN_FAILURE,
        target: 'user',
        payload: error
      });
    }
  },
  setCurrentUser: (user) => ({
    type: actions.SET_VALUES,
    target: 'user',
    payload: user
  }),
  setStateSession: (session) => ({
    type: actions.IS_AUTHED,
    target: 'isAuthed',
    payload: session
  }),
  logOut: () => async (dispatch) => {
    try {
      dispatch({ type: actions.SIGN_OUT });
      await authService.logout();
    } catch (error) {
      console.log('error al cerrar sesión', error);
    }
  }
};

export default actionCreators;
