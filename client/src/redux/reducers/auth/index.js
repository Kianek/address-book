import { LOGOUT, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const initialState = {
  isAuthenticated: false,
  error: false,
  loading: false,
};

/* Selectors */
export const selectAuthStatus = state => {
  return state.auth.isAuthenticated;
};
export const selectLoginError = state => {
  return state.auth.error;
};
export const selectAuthLoading = state => {
  return state.auth.loading;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: true,
        loading: false,
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};
