/**
 * For use with page-level components that manage forms.
 * This function expects to receive the top-level state,
 * and then checks all of the values. If any of the values
 * is an empty string, this function returns true; false otherwise.
 */
const isEmpty = state => {
  const isNull = state === null;
  const isUndefined = state === undefined;

  if (isNull || isUndefined) return true;

  const values = Object.values(state);
  const valueIsEmptyString = value => value === '';
  return values.every(valueIsEmptyString);
};

export default isEmpty;
