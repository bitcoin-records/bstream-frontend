/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const LOAD_TRACKS = 'boilerplate/App/LOAD_TRACKS';
export const LOAD_TRACKS_SUCCESS = 'boilerplate/App/LOAD_TRACKS_SUCCESS';
export const LOAD_TRACKS_ERROR = 'boilerplate/App/LOAD_TRACKS_ERROR';
export const SELECT_TRACK = 'boilerplate/Home/SELECT_TRACK';
export const SOCIAL_LOGIN = 'boilerplate/App/SOCIAL_LOGIN';
export const SOCIAL_LOGIN_PREPARE = 'boilerplate/App/SOCIAL_LOGIN_PREPARE';
export const SOCIAL_LOGIN_REQUEST = 'boilerplate/App/SOCIAL_LOGIN_REQUEST';
export const SOCIAL_LOGIN_SUCCESS = 'boilerplate/App/SOCIAL_LOGIN_SUCCESS';
export const SOCIAL_LOGIN_FAILURE = 'boilerplate/App/SOCIAL_LOGIN_FAILURE';
export const SOCIAL_LOGOUT = 'boilerplate/App/SOCIAL_LOGOUT';
export const DEFAULT_LOCALE = 'en';

