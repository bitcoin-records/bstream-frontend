import { fromJS } from 'immutable';

import {
  CHANGE_USER_WALLET_ID,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  userWalletId: '',
});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_WALLET_ID:
      return state
        .set('userWalletId', action.walletId);
    default:
      return state;
  }
}

export default registerReducer;
