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
  LOADING_CONTACTS,
} from './types';
import axios from 'axios';

/* Fetch Action Creators */
// TODO: rename so that the action better matches the reducer
const beginFetching = () => ({ type: FETCH_CONTACTS });
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
  dispatch(beginFetching());
  axios
    .get(`/api/contacts`)
    .then(res => dispatch(fetchSuccessful(res.data)))
    .catch(err => dispatch(fetchUnsuccessful(err)));
};
// Get one contact

/* Add Action Creators */
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
  axios
    .post(`/api/contacts/add`, newContact)
    .then(res => dispatch(addContactSuccessful(res.data)))
    .then(() => history.replace('/contacts'))
    .catch(err => dispatch(addContactUnsuccessful(err)));
};
// Edit contact

// Set loading
