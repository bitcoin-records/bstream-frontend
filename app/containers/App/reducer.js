/*
 * AppReducer
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
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_TRACKS_SUCCESS,
  LOAD_TRACKS,
  LOAD_TRACKS_ERROR,
  SELECT_TRACK,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGOUT,
  BSTREAM_REGISTER_REQUEST,
  BSTREAM_REGISTER_SUCCESS,
  BSTREAM_REGISTER_ERROR,
  BSTREAM_TRACK_STREAM_REQUEST,
  BSTREAM_TRACK_STREAM_SUCCESS,
  BSTREAM_TRACK_STREAM_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  searchString: '',
  userData: {
    tracks: false,
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_TRACKS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'tracks'], false);
    case LOAD_TRACKS_SUCCESS:
      return state
        .setIn(['userData', 'tracks'], action.tracks)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_TRACKS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SELECT_TRACK:
      return state
        .set('selectedTrack', action.track);
    case SOCIAL_LOGIN_SUCCESS:
      return state
        .set('user', action.user);
    case SOCIAL_LOGOUT:
      return state
        .set('user', initialState.user);
    case BSTREAM_REGISTER_REQUEST:
      return state
        .set('registeringUser', action.user)
        .set('loading', true)
        .set('error', false);
    case BSTREAM_REGISTER_SUCCESS:
      return state
        .set('bStreamUser', action.user);
    case BSTREAM_REGISTER_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case BSTREAM_TRACK_STREAM_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case BSTREAM_TRACK_STREAM_SUCCESS:
      return state
        .set('loading', false);
    case BSTREAM_TRACK_STREAM_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;