import { LOGOUT, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const initialState = {
  isAuthenticated: false,
  error: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
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
      };
    default:
      return state;
  }
};
