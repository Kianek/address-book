import {
  GET_CONTACT,
  FETCH_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
  EDIT_CONTACT,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_FAILURE,
  DELETE_ALL,
  DELETE_ALL_SUCCESS,
  DELETE_ALL_FAILURE,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  DELETE_CONTACT,
  EMPTY_FORM_ERROR,
  CLEAR_ERRORS,
} from './types';
import axios from 'axios';

/* Fetch Action Creators */
// TODO: rename so that the action better matches the reducer
const beginFetch = () => ({ type: FETCH_CONTACTS });
const fetchSuccessful = data => ({
  type: FETCH_CONTACTS_SUCCESS,
  payload: data,
});
const fetchUnsuccessful = err => ({
  type: FETCH_CONTACTS_FAILURE,
  payload: err,
});

// Fetch contacts
export const fetchContacts = () => dispatch => {
  dispatch(beginFetch());
  axios
    .get(`/api/contacts`)
    .then(res => dispatch(fetchSuccessful(res.data)))
    .catch(err => dispatch(fetchUnsuccessful(err)));
};

// Get one contact
export const getContact = id => dispatch => {
  dispatch({ type: GET_CONTACT, payload: id });
};

/* Add Action Creators */
const beginAdd = () => ({
  type: ADD_CONTACT,
});
const addContactSuccessful = data => ({
  type: ADD_CONTACT_SUCCESS,
  payload: data,
});

const addContactUnsuccessful = err => ({
  type: ADD_CONTACT_FAILURE,
  payload: err,
});

// Add contact
export const addContact = (newContact, history) => dispatch => {
  dispatch(beginAdd());
  axios
    .post(`/api/contacts/add`, newContact)
    .then(res => dispatch(addContactSuccessful(res.data)))
    .then(() => history.replace('/contacts'))
    .catch(err => dispatch(addContactUnsuccessful(err)));
};

/* Edit Action Creators*/
const beginEdit = () => ({
  type: EDIT_CONTACT,
});
const editContactSuccessful = data => {
  return {
    type: EDIT_CONTACT_SUCCESS,
    payload: data,
  };
};
const editContactUnsuccessful = err => {
  return {
    type: EDIT_CONTACT_FAILURE,
    payload: err,
  };
};
// Edit contact
export const editContact = (updContact, history) => dispatch => {
  dispatch(beginEdit());
  axios
    .put(`/api/contacts/${updContact._id}/update`, updContact)
    .then(res => dispatch(editContactSuccessful(res.data)))
    .then(() => history.replace('/contacts'))
    .catch(err => dispatch(editContactUnsuccessful(err)));
};

/* Delete Action Creators */
const beginDelete = () => ({
  type: DELETE_CONTACT,
});
const deleteContactSuccessful = data => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: data,
});
const deleteContactUnsuccessful = err => ({
  type: DELETE_CONTACT_FAILURE,
  payload: err,
});
// Delete a single contact
export const deleteContact = id => dispatch => {
  dispatch(beginDelete());
  axios
    .delete(`/api/contacts/${id}/delete`)
    .then(res => dispatch(deleteContactSuccessful(res.data)))
    .catch(err => dispatch(deleteContactUnsuccessful(err)));
};

/* Delete All Action Creators */
const beginDeleteAll = () => ({
  type: DELETE_ALL,
});
const deleteAllSuccessful = () => ({
  type: DELETE_ALL_SUCCESS,
});
const deleteAllUnsuccessful = err => ({
  type: DELETE_ALL_FAILURE,
  payload: err,
});
export const deleteAll = () => dispatch => {
  dispatch(beginDeleteAll());
  axios
    .delete(`/api/contacts/delete-all`)
    .then(() => dispatch(deleteAllSuccessful()))
    .catch(err => dispatch(deleteAllUnsuccessful(err)));
};

/* Empty Form Error Action Creator */
export const emptyFormError = () => dispatch => {
  dispatch({
    type: EMPTY_FORM_ERROR,
    payload: { msg: 'Please fill in the required fields' },
  });
};

export const clearErrors = () => dispatch =>
  dispatch({
    type: CLEAR_ERRORS,
  });
