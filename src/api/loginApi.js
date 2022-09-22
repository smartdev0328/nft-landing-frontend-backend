import { AutoFixOffSharp } from "@mui/icons-material";
import axios from "axios";

//const axios = Axios.create({
//    baseURL: 'https://affyn-marketplace-backend.herokuapp.com/api',
//    timeout: 15000
//});

// const storeSessionInfo = async (provider, sessionInfo) => {
//     console.log('storeSessionINfo has ben called!');
//     const apiBaseUrl = getAPIBaseUrl();
//     console.log('signUpMethods: ', provider == 'google', signUpMethod)
//     if (signUpMethod !== undefined) {

//         if (provider == 'google') {
//             console.log("callled!!!!", apiUrl)
//             const response = await axios.post(apiUrl, sessionInfo);
//             console.log('response is ', response);
//             return response;
//         }
//     }
// }

const retrieveGoogleCred = async (access_token) => {
  try {
    //console.log('Access token', access_token);
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
        access_token
    );
    return response;
  } catch (err) {
    //console.log('Error!', err);
    return err;
  }
};

const signIn = async (userInfo) => {
  try {
    const response = await axios.post("signin", userInfo);
    return response;
  } catch (err) {
    //console.log('Error during sign in: ', err);
    return err;
  }
};

const sendVerifyEmail = async (sessionInfo) => {
  try {
    const response = await axios.post("emailVerification", sessionInfo);
    return { status: response.status, data: response.data };
  } catch (err) {
    //console.log('Error verifying email ', err);
    return { message: err, status: err.status ? err.status : 404 };
  }
};

const resendVerifyEmail = async (sessionInfo) => {
  try {
    const response = await axios.post("resendEmailVerification", sessionInfo);
    console.log("response from resend otp");
    return { status: response.status, data: response.data };
  } catch (err) {
    console.log("Error resending email ", err);
    return { message: err, status: err.status ? err.status : 404 };
  }
};

const sendVerifying = async (verifyCode, otp) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${verifyCode}`;
    const response = await axios.post("verifying", {
      otpValue: otp,
    });
    return response;
  } catch (err) {
    //console.log('Error verifying code with email: ', err);
    return {
      status: 404,
    };
  }
};

const sendChangePasswordRequest = async (email) => {
  try {
    const response = await axios.post("/send_changepassword_request", {
      email,
    });
    return response;
  } catch (err) {
    //console.log('Error changing password: ', err);
    return { message: err, status: err.status ? err.status : 404 };
  }
};

const updatePassword = async (token, password) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put("update_password", { password });
    return response;
  } catch (err) {
    //console.log('Error occurred: ', err);
  }
};

const updateWallet = async (email, wallet, nationality, jwt) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    const response = await axios.post("connect_wallet", {
      email: email,
      wallet: wallet,
      nationality: nationality,
    });
    return response;
  } catch (err) {
    //console.log('Error occurred: ', err);
  }
};

const isWhitelisted = async (wallet) => {
  try {
    const response = await axios.post("is_whitelisted", { wallet });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const recaptchaVerification = async (value) => {
  try {
    const response = await axios.post("recaptcha", {
      response: value,
    });
    return response.status;
  } catch (err) {
    console.log(err);
  }
};

export {
  sendVerifyEmail,
  resendVerifyEmail,
  sendVerifying,
  signIn,
  sendChangePasswordRequest,
  updatePassword,
  retrieveGoogleCred,
  updateWallet,
  isWhitelisted,
  recaptchaVerification,
};
