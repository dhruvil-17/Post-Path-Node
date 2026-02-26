module.exports = {
  attributes: {

    type: {
      type: 'string',
      isIn: ['income','expense','transfer'],
      required: true
    },

    account: {
      model: 'account'
    },

    fromAccount: {
      model: 'account'
    },

    toAccount: {
      model: 'account'
    },

    amount: {
      type: 'number',
      required: true
    },

    category: {
      type: 'string',
      allowNull: true
    },

    owner: {
      model: 'user',
      required: true
    },

    transactionDate: {
      type: 'ref',
      columnType: 'datetime',
      required: true
    },

    deletedAt: {
      type: 'string',
      columnType: 'datetime',
      allowNull: true
    }

  }
};