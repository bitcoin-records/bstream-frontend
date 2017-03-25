/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectSearch = (state) => state.get('search');

const makeSelectSearchString = () => createSelector(
  selectSearch,
  (searchState) => searchState.get('searchString')
);

export {
  selectSearch,
  makeSelectSearchString,
};
