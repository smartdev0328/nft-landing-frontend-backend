import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
import Input from 'shared/Input/Input';
import { Link, useHistory } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { isEmptyString, removeSpacesFromString } from 'utils/validation';
import _ from 'lodash';
import { sendChangePasswordRequest } from '../../api/loginApi';
import LoadSpinner from 'shared/LoadSpinner/LoadSpinner';
import { Alert } from '@mui/material';
import ButtonSecondary from 'shared/Button/ButtonSecondary';

export interface ForgotPassProps {
  className?: string;
}

const ForgotPass: FC<ForgotPassProps> = ({ className = '' }) => {
  const history = useHistory();
  const redirectToHomepage = () => {
    history.push('/');
  };

  const [disableForm, setDisableForm] = useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [inputField, setInputField] = useState({
    email: ''
  });
  const [validationResult, setValidationResult] = useState({});
  const [successResult, setSuccessResult] = useState('');

  const handleInputChange = (field = '', value = '') => {
    const inputValue = removeSpacesFromString(value);
    setInputField({ ...inputField, [field]: inputValue });
    let result = validationResult;
    if (validationResult && validationResult[field as keyof typeof validationResult]) {
      result = _.omit(validationResult, field);
      setValidationResult(result);
    }
    if (_.isEmpty(result)) {
      setDisableForm(false);
    }
  };
  //let setCurrentSessionInfo = React.useContext(FynContext);

  function handleEmailResolve(e: React.SyntheticEvent<HTMLFormElement>) {
    setDisableForm(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    sendEmail(target.email.value);
  }

  function handleInputValidation(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    let isValid = !_.isEmpty(inputField);
    let validationResult = {};
    for (const field in inputField) {
      if (isEmptyString(inputField[field as keyof typeof inputField])) {
        validationResult = {
          ...validationResult,
          [field]: `${_.startCase(field)} should not be empty`
        };
        isValid = false;
      }
    }
    setValidationResult(validationResult);
    if (isValid) {
      handleEmailResolve(e);
    } else {
      setDisableForm(true);
    }
  }

  const sendEmail = async (emailAddress: string) => {
    const response: any = await sendChangePasswordRequest(emailAddress);
    if (response.status === 200) {
      setSuccessResult('Email sent! Please check your email to reset your password.');
    } else {
      //PROMPT USER - WRONG CREDENTIALS
      setValidationResult({
        email: 'Failed to send email. Please enter a valid email and try again.'
      });
    }
    setLoading(false);
  };

  const backToHomepage = () => {
    redirectToHomepage();
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Forgot Password | Marketplace App</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset your password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <LoadSpinner open={isLoading}></LoadSpinner>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleInputValidation} method="post">
            {_.isEmpty(validationResult) && !_.isEmpty(successResult) ? (
              <Alert severity="success">{successResult}</Alert>
            ) : (
              ''
            )}
            {!_.isEmpty(validationResult) ? (
              <Alert severity="error">
                {Object.keys(validationResult).map((key: any) => {
                  return (
                    <div key={key} className="validation-result">
                      {validationResult[key as keyof typeof validationResult]}
                    </div>
                  );
                })}
              </Alert>
            ) : (
              ''
            )}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={(event) => {
                  handleInputChange(event.target.id, event.target.value);
                }}
                value={inputField.email}
              />
            </label>
            <ButtonPrimary type="submit" disabled={disableForm}>
              Send Reset
            </ButtonPrimary>
            {!_.isEmpty(successResult) ? (
              <ButtonSecondary disabled={disableForm} onClick={() => backToHomepage()}>
                Back To Homepage
              </ButtonSecondary>
            ) : (
              ''
            )}
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" to="/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
