/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOAD_REPOS, LOAD_TRACKS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, tracksLoaded, trackLoadingError,
          bstreamRegisterRequest, bstreamRegisterSuccess, bstreamRegisterError } from 'containers/App/actions';

import request from 'utils/request';
import { BSTREAM_REGISTER_REQUEST } from 'containers/App/constants';
import { makeSelectRegisteringUser } from 'containers/App/selectors';

const Promise = this.Promise || require('promise');
const agent = require('superagent-promise')(require('superagent'), Promise);

/**
 * Spotify Tracks request handler
 */
export function* registerUser() {
  console.log('registerUser');
  try {
    console.log('try');
    const registeringUser = yield select(makeSelectRegisteringUser());
    console.log(registeringUser);
    console.log(agent);
    const register = () => agent.post('http://localhost:5000/register', registeringUser).end();
    const user = yield call(register);
    console.log(user);
    yield put(bstreamRegisterSuccess({ user }))
    yield put(push('/discover'));

  } catch (e) {
    console.error(e);
    yield put(bstreamRegisterError({ error: e }))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* registerUserWatch() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  //const watcher = yield takeLatest(LOAD_REPOS, getRepos);

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);

  const watcher = yield takeLatest(BSTREAM_REGISTER_REQUEST, registerUser);
}

// Bootstrap sagas
export default [
  registerUserWatch,
];
