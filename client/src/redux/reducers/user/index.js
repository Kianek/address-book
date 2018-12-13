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
} from './types';

import { LOGIN_SUCCESS } from '../auth/types';

const initialState = {
  name: '',
  id: '',
  contacts: [],
  currentContact: {},
  loading: false,
  error: {},
};

// Selectors
export const selectName = state => state.user.name;
export const selectId = state => state.user.id;
export const selectAllContacts = state => state.user.contacts;
export const isContactsEmpty = state => state.user.contacts.length === 0;
export const selectCurrentContact = state => state.user.currentContact;
export const isLoading = state => state.user.loading;

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
    default:
      return state;
  }
};
