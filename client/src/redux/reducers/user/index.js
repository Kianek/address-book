import { createSelector } from 'reselect';
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
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  DELETE_ALL,
  DELETE_ALL_SUCCESS,
  DELETE_ALL_FAILURE,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  CLEAR_ERRORS,
  EMPTY_FORM_ERROR,
} from './types';

import { LOGIN_SUCCESS } from '../auth/types';

const initialState = {
  name: '',
  id: '',
  contacts: [],
  currentContact: '',
  loading: false,
  error: {},
};

/* Selectors */
export const selectName = state => state.user.name;

export const selectId = state => state.user.id;

export const selectAllContacts = state => state.user.contacts;

export const selectCurrentContact = state => state.user.currentContact;

export const loadCurrentContact = createSelector(
  selectAllContacts,
  selectCurrentContact,
  (contacts, id) => contacts.find(c => c._id === id)
);

export const isContactsEmpty = state => state.user.contacts.length === 0;

export const isLoading = state => state.user.loading;

export const selectError = state => state.user.error;

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
      };
    case FETCH_CONTACTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
        error: {},
      };
    case FETCH_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CONTACT:
      return {
        ...state,
        currentContact: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        loading: true,
      };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ADD_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_CONTACT:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case EDIT_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case DELETE_CONTACT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_ALL:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: [],
      };
    case DELETE_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        name: '',
        id: '',
        contacts: [],
        currentContact: '',
        loading: false,
        error: {},
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EMPTY_FORM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: {},
      };
    default:
      return state;
  }
};
