/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectRegister = (state) => state.get('register');

const makeSelectUserWalletId = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('userWalletId')
);

export {
  selectRegister,
  makeSelectUserWalletId,
};
