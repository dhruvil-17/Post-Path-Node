
module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
    seq: { type: 'number', defaultsTo: 0 }
  }
};