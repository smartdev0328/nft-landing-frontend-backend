import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { signIn } from "../../api/loginApi";
import { useHistory } from "react-router-dom";
import { isEmptyString, removeSpacesFromString } from "utils/validation";
import _ from "lodash";
import LoadSpinner from "shared/LoadSpinner/LoadSpinner";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const cookies = new Cookies();
  const [disableForm, setDisableForm] = useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [showRecaptchaError, setShowRecaptchaError] = React.useState(false);
  const [recaptchaResult, setRecaptchaResult] = React.useState<
    boolean | null
  >();
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const [validationResult, setValidationResult] = useState({});
  const recapKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const handleInputChange = (field = "", value = "") => {
    const inputValue = removeSpacesFromString(value);
    setInputField({ ...inputField, [field]: inputValue });
    let result = validationResult;
    if (
      validationResult &&
      validationResult[field as keyof typeof validationResult]
    ) {
      result = _.omit(validationResult, field);
      setValidationResult(result);
    }
    if (_.isEmpty(result)) {
      setDisableForm(false);
    }
  };
  //let setCurrentSessionInfo = React.useContext(FynContext);
  const history = useHistory();

  const redirectToInventory = () => {
    history.push("/inventory");
  };

  const redirectToConnectWallet = () => {
    history.push("/connect-wallet");
  };

  function handleEmailResolve(e: React.SyntheticEvent<HTMLFormElement>) {
    //setDisableForm(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    if (recaptchaResult) {
      emailSignIn(target.email.value, target.password.value);
    } else {
      setShowRecaptchaError(true);
    }
  }

  function handleInputValidation(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    let isValid = !_.isEmpty(inputField);
    let validationResult = {};
    for (const field in inputField) {
      if (isEmptyString(inputField[field as keyof typeof inputField])) {
        validationResult = {
          ...validationResult,
          [field]: `${_.startCase(field)} should not be empty`,
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

  const emailSignIn = async (emailAddress: string, password: string) => {
    setLoading(true);
    const session = {
      emailAddress,
      password,
      recaptchaResult,
    };
    const response: any = await signIn(session);
    if (response.status === 200) {
      //console.log(response);
      const userData = JSON.stringify(response.data.userData);
      cookies.set("user", userData, {
        path: "/",
        secure: true,
        sameSite: true,
      });
      cookies.set("auth", "yes", { path: "/", secure: true, sameSite: true });
      cookies.set("jwt", response.data.token, {
        path: "/",
        secure: true,
        sameSite: true,
      });
      redirectToInventory();
    } else if (response.status === 201) {
      setValidationResult({
        password:
          'Incorrect username or password. If you are new, please use "Create an account". Otherwise, use "Forgot Password" to reset your password.',
      });
    } else {
      setValidationResult({
        email:
          'Incorrect username or password. If you are new, please use "Create an account". Otherwise, use "Forgot Password" to reset your password.',
      });
    }
    setLoading(false);
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login | Marketplace App</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Log In
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <LoadSpinner open={isLoading}></LoadSpinner>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleInputValidation}
            method="post"
          >
            {!_.isEmpty(validationResult) ? (
              <Alert className="action-message-container" severity="error">
                {Object.keys(validationResult).map((key: any) => {
                  return (
                    <div key={key} className="validation-result">
                      {validationResult[key as keyof typeof validationResult]}
                    </div>
                  );
                })}
              </Alert>
            ) : (
              ""
            )}
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
                <Link to="/forgot-pass" className="text-sm text-green-600">
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                id="password"
                className="mt-1"
                onChange={(event) => {
                  handleInputChange(event.target.id, event.target.value);
                }}
                value={inputField.password}
              />
            </label>
            <ReCAPTCHA
              sitekey={recapKey}
              size="normal"
              onChange={async (result: any) => {
                //console.log('recaptcha result is: ', result);
                setRecaptchaResult(result);
                // const recaptchaResult = await recaptchaVerification(result);
                // if (recaptchaResult === 200) {
                //   setRecaptchaResult(true);
                // }
              }}
            ></ReCAPTCHA>
            {showRecaptchaError && (
              <div
                style={{ textAlign: "center", color: "red", fontSize: "12px" }}
              >
                Please complete reCAPTCHA.
              </div>
            )}
            <ButtonPrimary type="submit" disabled={disableForm}>
              Continue
            </ButtonPrimary>
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

export default PageLogin;
