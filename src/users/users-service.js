'use strict';

const xss = require('xss');
const bcrypt = require('bcryptjs');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  hasUserWithEmail(db, email_address) {
    return db('remindful_users')
      .where({ email_address })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('remindful_users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if(password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72){
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')){
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number, and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      id: user.id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      email_address: xss(user.email_address),
      date_created: user.date_created
    };
  },
  deleteUser(db, email) {
    if(email === 'remindfulTest@gmail.com'){
      return null;
    } else {
      return db
        .from('remindful_users')
        .where('email_address', email)
        .del();
    }
  }
};

module.exports = UsersService