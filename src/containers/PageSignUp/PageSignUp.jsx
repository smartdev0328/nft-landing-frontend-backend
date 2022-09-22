import React from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { FynContext } from "context/FynContext";
import { sessionStorageItems, STRING_MAX_CHAR } from "contains/enum";
import {
  getPasswordPolicyValidationResult,
  isEmptyString,
  removeSpacesFromString,
  validateFunction,
} from "utils/validation";
import { sendVerifyEmail, resendVerifyEmail } from "api/loginApi";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import LoadSpinner from "shared/LoadSpinner/LoadSpinner";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import AlertWrapper from "shared/AlertWrapper/AlertWrapper";

// eslint-disable-next-line react/prop-types
const PageSignUp = ({ className = "" }) => {
  const cookies = new Cookies();
  const { setCurrentStep, setCurrentSessionInfo } =
    React.useContext(FynContext);
  const [isLoading, setLoading] = React.useState(false);
  const [recaptchaResult, setRecaptchaResult] = React.useState();
  const [showRecaptchaError, setShowRecaptchaError] = React.useState(false);
  const [inputField, setInputField] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otpMessage, setOtpMessage] = React.useState({});
  const [disableForm, setDisableForm] = React.useState(false);
  const [isFormValid, setFormValid] = React.useState(true);
  // TODO: show display error for fb/google signups
  const [displayError, setDisplayError] = React.useState(false);
  const [formValidationResult, setFormValidationResult] = React.useState("");
  const [passwordValidationResult, setPasswordValidationResult] =
    React.useState([]);
  const [isResendDisabled, setDisableResend] = React.useState(false);
  const [isResendHidden, setResendHidden] = React.useState(false);
  const history = useHistory();
  const recapKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const redirectToConnectWallet = () => {
    history.push("/connect-wallet");
  };

  const handlePasswordValidation = (password) => {
    if (!isEmptyString(password)) {
      const passwordValidationResult =
        getPasswordPolicyValidationResult(password);
      setPasswordValidationResult(passwordValidationResult);
    }
  };

  const handleFieldValidation = (email, password, confirmPassword) => {
    if (
      email.length > STRING_MAX_CHAR ||
      password.length > STRING_MAX_CHAR ||
      confirmPassword > STRING_MAX_CHAR
    ) {
      setFormValid(false);
      setFormValidationResult(
        `Please input less than ${STRING_MAX_CHAR} characters`
      );
      return false;
    } else if (!_.isEqual(password, confirmPassword)) {
      setFormValid(false);
      setFormValidationResult("Password and Confirm password do not match");
      return false;
    }
    setFormValid(true);
    setFormValidationResult("");
    return true;
  };

  const moveToNext = async () => {
    setDisableForm(true);
    setLoading(true);
    let formValidated = false;
    if (
      isEmptyString(inputField.email) ||
      isEmptyString(inputField.password) ||
      isEmptyString(inputField.confirmPassword)
    ) {
      setFormValid(false);
      setFormValidationResult("Please check that all fields are filled.");
    } else if (passwordValidationResult && passwordValidationResult.isValid) {
      formValidated = handleFieldValidation(
        inputField.email,
        inputField.password,
        inputField.confirmPassword
      );
    }
    if (formValidated && recaptchaResult) {
      let session = {
        emailAddress: inputField.email,
        password: inputField.password,
        recaptchaResult: recaptchaResult,
      };
      const response = await sendVerifyEmail(session);
      if (response.status === 200) {
        setOtpMessage(
          <>
            <p className="padding-bottom">{`OTP Code has been sent to ${inputField.email}. `}</p>
            <p>Please check your email and click on the link sent.</p>
          </>
        );
        session = response.data.user;
        validateFunction(setCurrentSessionInfo, session);
        setDisableForm(false);
      } else if (response.status === 201) {
        session = response.data.user;
        validateFunction(setCurrentSessionInfo, session);
        if (!_.isEmpty(session) && session.verified) {
          setResendHidden(true);
          setOtpMessage(
            <>
              <p className="padding-bottom">{`Email address ${inputField.email} has been previously registered and verified. `}</p>
              <p>Please click on 'Sign in' below to proceed to login page.</p>
            </>
          );
        } else {
          setOtpMessage(
            <>
              <p className="padding-bottom">{`Email address ${inputField.email} has been previously registered. `}</p>
              <p>
                Please check your email and click on the link sent. If you do
                not see it in your inbox, please check your junk or spam mail.
              </p>
            </>
          );
        }

        setDisableForm(false);
      } else {
        setFormValid(false);
        setFormValidationResult(
          "Error verifying email or password. Please check your email address, and avoid using illegal characters for your password."
        );
        setDisableForm(true);
      }
    }
    if (!recaptchaResult) {
      setShowRecaptchaError(true);
    }
    if (!recaptchaResult) {
      setShowRecaptchaError(true);
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    setDisableResend(true);
    setLoading(true);
    const session = {
      emailAddress: inputField.email,
      password: inputField.password,
    };
    //TODO: fix resend otp codes and add expiry to current otp
    const response = await resendVerifyEmail(session);
    if (response.status === 200) {
      setOtpMessage(`OTP Code has been re-sent to ${inputField.email}.`);
    } else {
      setFormValid(false);
      setFormValidationResult(
        "Error resending OTP. Please try again, or use a different email address."
      );
    }
    setLoading(false);
    setDisableResend(false);
  };

  const backToHomePage = () => {
    setOtpMessage({});
    history.push("/");
  };

  const handleInputChange = (field, value) => {
    const inputValue = removeSpacesFromString(value);
    if (field === "password") {
      handlePasswordValidation(inputValue);
    }
    if (field === "email" && inputValue !== inputField[field]);
    {
      setDisableForm(false);
    }
    setInputField({ ...inputField, [field]: inputValue });
    setFormValid(true);
    setFormValidationResult("");
  };

  const hasPasswordValidationResult =
    passwordValidationResult &&
    !passwordValidationResult.isValid &&
    !_.isEmpty(passwordValidationResult.validationResult);

  const showSignUpForm = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <AlertWrapper
          id="password-validation-error"
          show={hasPasswordValidationResult}
          errorType="error"
          message={
            hasPasswordValidationResult &&
            passwordValidationResult.validationResult.map(
              (validationResultItem) => {
                return (
                  <div
                    key={validationResultItem.key}
                    className="validation-result"
                  >
                    {validationResultItem.errorMessage}
                  </div>
                );
              }
            )
          }
        ></AlertWrapper>
        <AlertWrapper
          id="form-validation-error"
          show={!hasPasswordValidationResult && !isFormValid}
          errorType="error"
          message={formValidationResult}
        ></AlertWrapper>
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Email address
          </span>
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
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
          </span>
          <Input
            id="password"
            type="password"
            className={`mt-1 input-field-wrapper ${
              hasPasswordValidationResult ? "has-error" : ""
            }`}
            onChange={(event) => {
              handleInputChange(event.target.id, event.target.value);
            }}
            value={inputField.password}
          />
          {_.isEmpty(inputField.password) ? (
            <div className="password-hint">
              Password should contain at least 8 characters, an upper case
              letter, lower case letter, and a number.
            </div>
          ) : (
            ""
          )}
        </label>
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Confirm Password
          </span>
          <Input
            id="confirmPassword"
            type="password"
            className="mt-1"
            onChange={(event) => {
              handleInputChange(event.target.id, event.target.value);
            }}
            value={inputField.confirmPassword}
          />
        </label>
        <ReCAPTCHA
          sitekey={recapKey}
          size="normal"
          onChange={async (result) => {
            //console.log('recaptcha result is: ', result);
            setRecaptchaResult(result);
          }}
        ></ReCAPTCHA>
        {showRecaptchaError && (
          <div style={{ textAlign: "center", color: "red", fontSize: "12px" }}>
            Please complete reCAPTCHA.
          </div>
        )}
        <ButtonPrimary
          onClick={() => {
            if (!disableForm) moveToNext();
          }}
          disabled={disableForm}
        >
          Continue
        </ButtonPrimary>
      </div>
    );
  };

  const showOtpForm = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        {!isFormValid ? (
          <Alert severity="error">{formValidationResult}</Alert>
        ) : (
          ""
        )}
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            {otpMessage}
          </span>
        </label>
        {!isResendHidden ? (
          <ButtonPrimary
            onClick={() => {
              if (!isResendDisabled) resendOtp();
            }}
            disabled={isResendDisabled}
          >
            Resend OTP
          </ButtonPrimary>
        ) : (
          ""
        )}
        <ButtonSecondary
          onClick={() => {
            if (!isResendDisabled) backToHomePage();
          }}
          disabled={isResendDisabled}
        >
          Back To Homepage
        </ButtonSecondary>
      </div>
    );
  };
  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign Up
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/*
          <div className="grid gap-3">
            <SocialSignUpButton
              provider={'facebook'}
              handleResolve={handleFBResolve}></SocialSignUpButton>
            <SocialSignUpButton
              provider={'google'}
              handleResolve={handleGoogleResolve}></SocialSignUpButton>
          </div>
        */}
          {/* OR */}
          <div className="relative text-center">
            {/*
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            */}
          </div>
          {/* FORM */}
          <LoadSpinner open={isLoading}></LoadSpinner>
          {!_.isEmpty(otpMessage) ? showOtpForm() : showSignUpForm()}
          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
