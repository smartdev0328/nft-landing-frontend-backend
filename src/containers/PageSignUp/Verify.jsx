import React from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import {
  sendVerifying
} from "../../api/loginApi";
import { FynContext } from "context/FynContext";
import { isEmptyString, removeSpacesFromString } from "utils/validation";
import _ from "lodash";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";
import VerificationSuccessModal from "./VerificationSuccessModal";
import { sessionStorageItems, userDataInfo } from "contains/enum";

// eslint-disable-next-line react/prop-types
const Verify = ({ className = "" }) => {
  const history = useHistory();
  const { token } = useParams();
  const [emailAddress, setEmailAddress] = React.useState("");
  const { setCurrentStep, setCurrentSessionInfo } =
    React.useContext(FynContext);
  const [displayError, setDisplayError] = React.useState(false);
  const [otpField, setOtpField] = React.useState("");
  const [disableForm, setDisableForm] = React.useState(true);
  const [validationResult, setValidationResult] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  const handleInputChange = (value = "") => {
    const inputValue = removeSpacesFromString(value);
    console.log(inputValue);
    setOtpField(inputValue);
    if (_.isEmpty(inputValue)) {
      setDisableForm(true);
    } else if (inputValue.length < 6) {
      setDisableForm(true);
    } else setDisableForm(false);
    console.log(disableForm);
  };

  function handleInputValidation(e) {
    e.preventDefault();
    let isValid = !_.isEmpty(otpField);
    let validationResult = "";
    if (isEmptyString(otpField)) {
      validationResult = `${_.startCase(otpField)} should not be empty`;
      isValid = false;
    }
    setValidationResult(validationResult);
    if (isValid) {
      //Success, send otp
      verifyApi(token, otpField);
    } else {
      setDisableForm(true);
    }
  }

  const verifyApi = async (jwtToken, otp) => {
    console.log("token: ", jwtToken);
    console.log("otp:", otp);
    const cookies = new Cookies();
    let validationResult = "";

    const verifyResponse = await sendVerifying(jwtToken, otp);
    console.log("backend response: ", verifyResponse);
    if (verifyResponse.status === 200) {
      if (verifyResponse.data !== undefined)
      {
        if (verifyResponse.data === 'Verification code sent!')
        {
          validationResult = `The OTP you have entered has expired. A new OTP has been resent to your email.`;
          setValidationResult(validationResult);
        }
        else {
      if (verifyResponse.data.userData !== undefined && verifyResponse.data.userData.email !== undefined)
        setEmailAddress(verifyResponse.data.userData.email);

      sessionStorage.removeItem(sessionStorageItems.USER);
      sessionStorage.removeItem(sessionStorageItems.TOKEN);
      sessionStorage.removeItem(sessionStorageItems.AVATAR);
      sessionStorage.removeItem(sessionStorageItems.TEMP_EGG);
      cookies.remove(sessionStorageItems.USER);
      cookies.remove("user");
      cookies.remove("auth");
      cookies.remove("jwt");
      cookies.set("auth", "no", { path: "/", secure: true, sameSite: true });

      setShowModal(true);
        }
    } 
  }
    else if (verifyResponse.status === 404) {
      validationResult = `An Error Occurred. Has the OTP expired? A new OTP will be sent.`;
      setValidationResult(validationResult);
    } else if (verifyResponse.status === 201) {
      validationResult = `User is already verified.`;
      setValidationResult(validationResult);
    }
    else {
      validationResult = `An Error Occurred.`;
      setValidationResult(validationResult);
    }
  };

  const modalClick = () => {
    history.push("/login");
  };

  const ModalContent = () => {
    return (
      <div className="w-full items-center flex text-center flex-col">
        <div className="text-sm mb-10">Please login to continue.</div>
        <div
          className=" mb-8 text-white rounded-full text-sm bg-primary-6000 border-0 p-10 py-3 cursor-pointer"
          onClick={() => modalClick()}
        >
          Back to login
        </div>
      </div>
    );
  };
  //verifyApi(token, email);
  return (
    <div className={`${className}`}>
      <Helmet>
        <title>Verification | Marketplace App</title>
      </Helmet>
      <VerificationSuccessModal
        renderContent={ModalContent}
        isOpenProp={showModal}
        modalTitle="Verification Successful!"
        renderTrigger={() => ""}
        onCloseModal={() => setShowModal(false)}
      ></VerificationSuccessModal>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Verification
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleInputValidation}
            method="post"
          >
            {!_.isEmpty(validationResult) ? (
              <Alert severity="error">{validationResult}</Alert>
            ) : (
              ""
            )}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Please Enter OTP
              </span>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                className="mt-1"
                onChange={(event) => {
                  handleInputChange(event.target.value);
                }}
                value={otpField}
              />
            </label>
            <ButtonPrimary type="submit" disabled={disableForm}>
              Continue
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
