import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { updatePassword } from '../../api/loginApi';
import {
  isEmptyString,
  removeSpacesFromString,
  getPasswordPolicyValidationResult
} from 'utils/validation';
import _ from 'lodash';
import Input from 'shared/Input/Input';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { STRING_MAX_CHAR } from 'contains/enum';
import LoadSpinner from 'shared/LoadSpinner/LoadSpinner';
import { Alert } from '@mui/material';

const ResetPass = ({ className = '' }) => {
  const { token } = useParams();
  const [isLoading, setLoading] = React.useState(false);
  const [validationResult, setValidationResult] = React.useState('');
  const [formValidationResult, setFormValidationResult] = React.useState('');
  const [isFormValid, setFormValid] = React.useState(true);
  const [passwordValidationResult, setPasswordValidationResult] = React.useState([]);
  const [inputField, setInputField] = React.useState({
    password: '',
    confirmPassword: ''
  });
  const history = useHistory();

  const handlePasswordValidation = (password) => {
    if (!isEmptyString(password)) {
      const passwordValidationResult = getPasswordPolicyValidationResult(password);
      setPasswordValidationResult(passwordValidationResult);
    }
  };

  const handleFieldValidation = (passwordOne, passwordTwo) => {
    if (passwordOne.length > STRING_MAX_CHAR || passwordTwo.length > STRING_MAX_CHAR) {
      setFormValid(false);
      setFormValidationResult(`Please input less than ${STRING_MAX_CHAR} characters`);
      return false;
    } else if (!_.isEqual(passwordOne, passwordTwo)) {
      setFormValid(false);
      setFormValidationResult('Password and Confirmation password do not match');
      return false;
    } else {
      setFormValid(true);
      setFormValidationResult('');
      return true;
    }
  };

  const handleInputChange = (field, value) => {
    const inputValue = removeSpacesFromString(value);
    if (field === 'password') {
      handlePasswordValidation(inputValue);
    }
    setInputField({ ...inputField, [field]: inputValue });
    setFormValid(true);
    setFormValidationResult('');
  };

  const processResetPassword = async (e) => {
    setLoading(true);
    e.preventDefault();

    let formValidated = false;
    if (isEmptyString(inputField.password) || isEmptyString(inputField.confirmPassword)) {
      setFormValid(false);
      setFormValidationResult('Please check that all fields are filled.');
      setLoading(false);
    } else if (passwordValidationResult && passwordValidationResult.isValid) {
      formValidated = handleFieldValidation(inputField.password, inputField.confirmPassword);

      if (formValidated) {
        //FIRE API
        try {
          const response = await updatePassword(token, inputField.password);
          if (response.status === 200) {
            history.push('/reset-success');
          } else {
            setFormValid(false);
            setFormValidationResult('Error in updating password. Please try again.');
            setLoading(false);
          }
        } catch (e) {
          //console.log('error: ', e);
        }
      } else {
        //console.log('form not validated');
      }
    } else {
      setFormValid(false);
    }
    setLoading(false);
  };

  const hasPasswordValidationResult =
    passwordValidationResult &&
    !passwordValidationResult.isValid &&
    !_.isEmpty(passwordValidationResult.validationResult);

  return (
    <div className={`${className}`}>
      <Helmet>
        <title>Reset Password | Marketplace App</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
            <LoadSpinner open={isLoading}></LoadSpinner>
            {!_.isEmpty(validationResult) ? <Alert severity="error">{validationResult}</Alert> : ''}
            {hasPasswordValidationResult ? (
              <Alert severity="error">
                {passwordValidationResult.validationResult.map((validationResultItem) => {
                  return (
                    <div key={validationResultItem.key} className="validation-result">
                      {validationResultItem.errorMessage}
                    </div>
                  );
                })}
              </Alert>
            ) : (
              ''
            )}
            {!hasPasswordValidationResult && !isFormValid ? (
              <Alert severity="error">{formValidationResult}</Alert>
            ) : (
              ''
            )}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">New Password</span>
              <Input
                id="password"
                type="password"
                placeholder="password"
                className={`mt-1 input-field-wrapper ${
                  hasPasswordValidationResult ? 'has-error' : ''
                }`}
                onChange={(event) => {
                  handleInputChange(event.target.id, event.target.value);
                }}
                value={inputField.password}
              />
              {_.isEmpty(inputField.password) ? (
                <div className="password-hint">
                  Password should contain at least 8 characters, an upper case letter, lower case
                  letter, and a number.
                </div>
              ) : (
                ''
              )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Re-enter New Password</span>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="password"
                className={`mt-1 input-field-wrapper ${
                  hasPasswordValidationResult ? 'has-error' : ''
                }`}
                onChange={(event) => {
                  handleInputChange(event.target.id, event.target.value);
                }}
                value={inputField.confirmPassword}
              />
            </label>
            <ButtonPrimary type="submit" onClick={processResetPassword}>
              Reset Password
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
