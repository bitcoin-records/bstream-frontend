/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_TRACKS } from 'containers/App/constants';
import { tracksLoaded, trackLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectSearchString } from 'containers/SearchPage/selectors';


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
export function* tracksData() {
  const watcher = yield takeLatest(LOAD_TRACKS, getTracks);
}

// Bootstrap sagas
export default [
  tracksData,
];
