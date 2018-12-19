/*
 * For use with page-level components that manage forms.
 * Takes in the component state, and then checks all of its values.
 * If any of the values is an empty string, this function
 * returns true; false otherwise.
 */
export const isEmpty = state => {
  if (isNullOrUndefined(state)) return true;

  const values = Object.values(state);
  const valueIsEmptyString = value => value === '';
  return values.every(valueIsEmptyString);
};

/*
 * Takes a normalized component state object, and returns
 * an object structured the way the backend API expects.
 */
export const createNewContactFrom = state => {
  if (isNullOrUndefined(state)) {
  }

  const newContact = {
    name: {
      first: state.firstName,
      middle: state.middleName,
      last: state.lastName,
    },
    phone: state.phone,
    email: state.email,
    address: {
      line1: state.line1,
      line2: state.line2,
      city: state.city,
      state: state.state,
      zip: state.zip,
    },
  };

  return newContact;
};

const isNullOrUndefined = arg => {
  const isNull = arg === null;
  const isUndefined = typeof arg === undefined;

  if (isNull || isUndefined) {
    return true;
  }
  return false;
};
