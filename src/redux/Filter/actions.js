import { completeTypes, createTypes } from 'redux-recompose';

export const actions = createTypes(completeTypes({ primaryActions: [], ignoredActions: ['SET_CURRENT_FILTER', 'SHOW_FILTER'] }), '@@FILTER');

const actionCreators = {
  setCurrentFilter: (filter) => ({
    type: actions.SET_CURRENT_FILTER,
    target: 'current',
    payload: filter
  }),
  showFilter: () => ({
    type: actions.SHOW_FILTER,
    target: 'isOpen'
  })
};

export default actionCreators;
