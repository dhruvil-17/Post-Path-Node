module.exports = {
  attributes: {

    receiver: {
      type: 'string',
      required: true
    },

    amount: {
      type: 'number',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    },

    createdAt: {
      type: 'number',
      autoCreatedAt: true
    }

  }
};
