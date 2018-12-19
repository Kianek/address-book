import axios from 'axios';
import { LOGOUT, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

/* Login Action Creators */
const beginLogin = () => ({ type: LOGIN });

const loginSuccessful = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const loginUnsuccessful = err => ({
  type: LOGIN_FAILURE,
  payload: err,
});

export const login = (credentials, history) => dispatch => {
  dispatch(beginLogin());
  axios
    .post(`/api/users/login`, credentials)
    .then(res => dispatch(loginSuccessful(res.data)))
    .then(() => history.replace('/contacts'))
    .catch(err => {
      dispatch(loginUnsuccessful(err));
    });
};

export const logout = () => dispatch => {
  axios
    .get(`/api/users/logout`)
    .then(() => dispatch({ type: LOGOUT }))
    .catch(err => console.log(err));
};
