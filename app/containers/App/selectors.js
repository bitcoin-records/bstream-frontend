/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('user')
);

const makeSelectBStreamUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('bStreamUser')
);

const makeSelectSearchString = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('searchString')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectTracks = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'tracks'])
);

const makeSelectSelectedTrack = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('selectedTrack')
);

const makeSelectRegisteringUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('registeringUser')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectTracks,
  makeSelectSelectedTrack,
  makeSelectLocationState,
  makeSelectRegisteringUser,
  makeSelectBStreamUser,
};
