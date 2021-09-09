import { completeReducer, createReducer, onSpreadValue, completeState, onReadValue } from 'redux-recompose';

import { actions } from './actions';

const initialState = {
  isAuthed: false
};

const state = completeState(initialState, ['isAuthed']);

const reducerDescription = {
  primaryActions: [actions.LOGIN],
  override: {
    [actions.SET_VALUES]: onSpreadValue(),
    [actions.IS_AUTHED]: onReadValue(),
    [actions.SIGN_OUT]: onReadValue()
  }
};

const reducer = createReducer(state, completeReducer(reducerDescription));

export { reducer };
