const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Create JWT',

  inputs: {
    userId: { type: 'string', required: true }
  },

  fn: async function ({ userId }) {
    return jwt.sign(
      { userId },
      sails.config.custom.jwtSecret,
      { expiresIn: '1d' }
    );
  }
};
