// items set in sessionStorage
export const sessionStorageItems = {
  USER: 'user',
  TOKEN: 'token',
  AVATAR: 'avatar',
  CURRENT_STEP: 'currentStep',
  VERIFY: 'verify',
  IS_AUTH: 'auth',
  TEMP_EGG: 'temp_egg',
  JWT: 'jwt'
};

// values stored in user of sessionStorage, based on signin response
export const userDataInfo = {
  CREATED: 'created',
  EMAIL: 'email',
  HASHED_PASSWORD: 'hashed_password',
  NATIONALITY: 'nationality',
  SALT: 'salt',
  SIGN_UP_METHOD: 'signUpMethod',
  USERNAME: 'userName',
  WALLET: 'wallet',
  EGG: 'egg',
  TEMP_FYN: 'fyn',
  VERIFIED: 'verified'
};

export const PasswordValidationKey = {
  LOWER_CASE: 'lowerCase',
  UPPER_CASE: 'upperCase',
  NUM_CHECK: 'numberCheck',
  MIN_CHAR: 'minCharacters'
};

export const PASSWORD_MIN_CHAR = 8;
export const STRING_MAX_CHAR = 255;

export default {};
