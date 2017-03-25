/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectSelectedTrack = () => createSelector(
  selectHome,
  (homeState) => homeState.get('selectedTrack')
);


export {
  selectHome,
  makeSelectUsername,
  makeSelectSelectedTrack,
};
