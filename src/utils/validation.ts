import { PasswordValidationKey, PASSWORD_MIN_CHAR } from 'contains/enum';
import _ from 'lodash';

export function validateFunction(functionName = {}, value = {}) {
  if (functionName && typeof functionName === 'function') {
    return functionName(value);
  }
}

export function removeSpacesFromString(value = '') {
  return value.replace(/\s+/g, '');
}

export function isEmptyString(value = '') {
  return _.isEmpty(removeSpacesFromString(value));
}

export function getPasswordPolicyValidationResult(password = '') {
  let isValid = true;
  const validationResult = [];
  if (_.toUpper(password) === password) {
    validationResult.push({
      key: PasswordValidationKey.LOWER_CASE,
      errorMessage: 'Password must contain a lowercase letter'
    });
    isValid = false;
  }
  if (_.toLower(password) === password) {
    validationResult.push({
      key: PasswordValidationKey.UPPER_CASE,
      errorMessage: 'Password must contain an uppercase letter'
    });
    isValid = false;
  }
  if (!/\d/.test(password)) {
    validationResult.push({
      key: PasswordValidationKey.NUM_CHECK,
      errorMessage: 'Password must contain a number'
    });
    isValid = false;
  }
  if (password.length < PASSWORD_MIN_CHAR) {
    validationResult.push({
      key: PasswordValidationKey.MIN_CHAR,
      errorMessage: 'Password must contain at least 8 characters'
    });
    isValid = false;
  }
  return { isValid, validationResult };
}

export default {};
