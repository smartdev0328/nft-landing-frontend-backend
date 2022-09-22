const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true
  },
  otp : String,
  otpTime: {
    type: Date,
    default: Date.now
  },
  verified : Boolean,
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/, 'Please fill a valid email address'],
    required: 'Email is required',
    lowercase: true,
  },
  userName: String,
  wallet: String,
  nationality: String,
  signUpMethod: {
    type: String,
    default: 'other' || 'google' || 'facebook' || 'twitter',
    require: true
  },
  hashed_password: {
    type: String
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// const containsUpper = (password) => {
//   return !/[a-z]/.test(password) && /[A-Z]/.test(password);
// }

// const containsLower = (password) => {
//   return (/a-z/.test(password));
// }

function allCases(string) {
  const
      upper = /[A-Z]/.test(string),
      lower = /[a-z]/.test(string);

  return upper && lower;
}

const containsNumber = (password) => {
  return /\d/.test(password);
}


userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = bcrypt.genSaltSync(10);
    this.hashed_password = bcrypt.hashSync(password, this.salt);
  })
  .get(function () {
    return this._password
  })

userSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 8) {
      this.invalidate('password', 'Password must be at least 8 characters.')    
  }
  if(this._password && !allCases(this._password)) {
      this.invalidate('password', 'Password must contains at least 1 upper & lower character.');
  }
  if(this._password && !containsNumber(this._password)) {
      this.invalidate('password', 'Password must contains at least 1 number.');
  }
  if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')      
  }
}, null)

userSchema.methods = {
  authenticate: function (plainText) {
    const hash = bcrypt.hashSync(plainText, this.hashed_password)
    //return crypto.timingSafeEqual(hash, this.hashed_password);
    return bcrypt.compareSync(plainText, this.hashed_password);
  }
}
mongoose.model('User', userSchema);