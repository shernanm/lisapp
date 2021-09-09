import { createReducer, onReadValue, completeState, onToggle } from 'redux-recompose';

import { actions } from './actions';

const initialState = {
  current: 'finded',
  isOpen: false
};

const state = completeState(initialState, ['current', 'isOpen']);

const reducerDescription = {
  [actions.SET_CURRENT_FILTER]: onReadValue(),
  [actions.SHOW_FILTER]: onToggle()
};

const reducer = createReducer(state, reducerDescription);

export { reducer };
