const { v4: uuidv4 } = require("uuid");

module.exports = {
  friendlyName: "Generate account number",

  description: "Generate unique 12 digit account number",

  fn: async function () {
    const uuid = uuidv4();
    const accountNumber = parseInt(uuid.replace(/-/g, "").slice(0, 12), 16)
      .toString()
      .slice(0, 12);
    return accountNumber;
  },
};
