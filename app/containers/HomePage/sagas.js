/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, LOAD_TRACKS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, tracksLoaded, trackLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername, makeSelectSearchString } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Spotify Tracks request handler
 */
export function* getTracks() {
  const searchQuery = yield select(makeSelectSearchString());
  const requestURL = `https://api.spotify.com/v1/search?type=track&q=${searchQuery}`;

  try {
    const tracks = yield call(request, requestURL);
    yield put(tracksLoaded(tracks, searchQuery));
  } catch (err) {
    yield put(trackLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  //const watcher = yield takeLatest(LOAD_REPOS, getRepos);

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);

  const watcher = yield takeLatest(LOAD_TRACKS, getTracks);
}

// Bootstrap sagas
export default [
  githubData,
];
