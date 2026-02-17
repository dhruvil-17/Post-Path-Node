/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // api/models/User.js

    fullName: { type: 'string', required: true },
    email: { type: 'string', isEmail: true, unique: true },
    age: { type: 'number' },

    pets : {
      collection : 'pet',
      via : 'owner'
    }

  },

};

