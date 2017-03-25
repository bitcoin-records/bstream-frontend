/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_SEARCHSTRING,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  searchString: 'chill',
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCHSTRING:
      // Delete prefixed '@' from the github username
      return state
        .set('searchString', action.searchString.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default searchReducer;
