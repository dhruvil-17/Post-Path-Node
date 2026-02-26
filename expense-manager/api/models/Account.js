/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", required: true },
    
    accountNumber: { type: "string", unique: true , required : true},

    balance: { type: "number", defaultsTo: 0 },

    isDefault: { type: "boolean", defaultsTo: false },

    owner: {
      model: "user",
      required: true,
    },
    deletedAt: {
      type: "string",
      columnType: "datetime",
      allowNull: true,
    },
  },
};
