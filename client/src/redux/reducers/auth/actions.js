import axios from 'axios';
import {
  LOGOUT,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './types';

/**
 * Attempt login with user-supplied credentials
 *
 * The credentials supplied are an email address and a password
 * */
export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_IN_PROGRESS });
  axios
    .post(`/api/users/login`, credentials)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => console.log(err), dispatch({ type: LOGIN_FAILURE }));
};

// Log out
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
