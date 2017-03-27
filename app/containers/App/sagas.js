import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux';
import { 
          socialLoginPrepare, 
          socialLoginRequest, 
          socialLoginSuccess, 
          socialLoginFailure, 
          socialLogout,
          bstreamRegisterRequest,
          bstreamRegisterSuccess,
          bstreamRegisterError,
          bstreamTrackStreamRequest,
          bstreamTrackStreamSuccess,
          bstreamTrackStreamError
       } from './actions'
import { SOCIAL_LOGIN_PREPARE, SOCIAL_LOGIN_REQUEST, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE, SOCIAL_LOGOUT, 
          BSTREAM_REGISTER_REQUEST, BSTREAM_TRACK_STREAM_REQUEST, BSTREAM_TRACK_STREAM_SUCCESS, BSTREAM_TRACK_STREAM_ERROR,
          START_TRACK, STOP_TRACK } from './constants'
import { makeSelectRegisteringUser, makeSelectUser, makeSelectBStreamUser, makeSelectIsTrackPlaying, makeSelectSelectedTrack } from 'containers/App/selectors';

const ONE_SECOND = 1000;
const Promise = this.Promise || require('promise');
const agent = require('superagent-promise')(require('superagent'), Promise);

export const promises = {
  fbLogin: (options) => new Promise((resolve, reject) => {
    window.FB.login((response) => {
      // istanbul ignore else
      if (response.authResponse) {
        resolve(response.authResponse)
      } else {
        reject(response.status)
      }
    }, options)
  }),
  fbGetMe: (options) => new Promise((resolve) => {
    window.FB.api('/me', options, (me) => resolve(me))
  }),
  loadGoogleAuth2: () => new Promise((resolve) => {
    window.gapi.load('auth2', resolve)
  }),
  loadScript: (src) => new Promise((resolve, reject) => {
    const js = document.createElement('script')
    js.src = src
    js.onload = resolve
    js.onerror = reject
    document.head.appendChild(js)
  })
}

export const appendFbRoot = () => {
  const fbRoot = document.createElement('div')
  fbRoot.id = 'fb-root'
  document.body.appendChild(fbRoot)
}

export const serviceAction = (suffix, service) => (action) =>
  action.type === `SOCIAL_LOGIN_${suffix}` && action.service === service

export function* loginFacebook ({ scope = 'public_profile', fields = 'id,name', ...options } = {}) {
  console.log('loginFacebook');
  try {
    yield call(promises.fbLogin, { scope, ...options })
    const data = yield call(promises.fbGetMe, { fields })
    const picture = `https://graph.facebook.com/${data.id}/picture?type=normal`
    yield put(socialLoginSuccess({ ...data, picture }))
    yield put(push('/register'))
  } catch (e) {
    yield put(socialLoginFailure(e))
  }
}

export function* prepareFacebook ({ appId, version = 'v2.8', ...options }) {
  console.log('prepareFacebook');
  yield call(appendFbRoot)
  yield call(promises.loadScript, '//connect.facebook.net/en_US/sdk.js')
  yield call([window.FB, window.FB.init], { appId, version, ...options })
}

export function* watchSocialLoginFacebook () {
  const { options } = yield take(SOCIAL_LOGIN_PREPARE)
  yield call(prepareFacebook, options)
  while (true) {
    const { options } = yield take(SOCIAL_LOGIN_REQUEST)
    yield call(loginFacebook, options)
  }
}

export function* loginGoogle ({ scope = 'profile', ...options } = {}) {
  const auth2 = yield call(window.gapi.auth2.getAuthInstance)
  const user = yield call([auth2, auth2.signIn], { scope, ...options })
  const profile = yield call([user, user.getBasicProfile])
  const name = yield call([profile, profile.getName])
  const picture = yield call([profile, profile.getImageUrl])
  yield put(socialLoginSuccess({ name, picture }))
}

export function* prepareGoogle ({ client_id, ...options }) {
  yield call(promises.loadScript, '//apis.google.com/js/platform.js')
  yield call(promises.loadGoogleAuth2)
  yield call(window.gapi.auth2.init, { client_id, ...options })
}

export function* watchSocialLoginGoogle () {
  const { options } = yield take(serviceAction('PREPARE', 'google'))
  yield call(prepareGoogle, options)
  while (true) {
    const { options } = yield take(serviceAction('REQUEST', 'google'))
    yield call(loginGoogle, options)
  }
}

export function* watchBStreamRegister () {
  while (true) {
    try {
      console.log('try');
      const registeringUser = yield take(makeSelectRegisteringUser());
      const { options } = yield take(BSTREAM_REGISTER_REQUEST);
      const user = yield call(
                  agent.post('http://localhost:5000/register', registeringUser)
                    .end(), 
                  options
                );
      yield put(bstreamRegisterSuccess({ user }))
    } catch (e) {
      yield put(bstreamRegisterError({ error: e }))
    }
  }
}

export function* trackStream() {
  try {
    const selectedTrack = yield select(makeSelectSelectedTrack());
    const bStreamUser = yield select(makeSelectBStreamUser());
    const data = {
      username: bStreamUser.user.username,
      trackPrice: 0.0001,
      artist: 'bitnickelback',
    };
    const req = () => agent.post('http://localhost:5000/track-stream', data).end();
    const response = yield call(req);
    yield put(bstreamTrackStreamSuccess({ balance: response.body.balance }))
  } catch (e) {
    console.error(e);
    yield put(bstreamTrackStreamError({ error: e }))
  }
}

export function* rootSaga() {
  // const watcher = yield takeLatest(BSTREAM_REGISTER_REQUEST, registerUser);
  yield fork(watchSocialLoginFacebook)

  while(yield take(START_TRACK)) {
    while(true) {
      yield call(delay, 1000);
      const isTrackPlaying = yield select(makeSelectIsTrackPlaying());
      if (isTrackPlaying) {
        const selectedTrack = yield select(makeSelectSelectedTrack());
        yield trackStream();
        //yield put(bstreamTrackStreamRequest({ track: selectedTrack }))
      } else {
        break;
      }
    }
  }

}

export default [
  rootSaga,
];
