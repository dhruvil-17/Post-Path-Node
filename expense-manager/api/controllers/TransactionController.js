/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // List (latest first)
  list: async (req, res) => {

    const transactions = await Transaction.find({
      owner: req.session.userId
    }).sort('createdAt DESC');

    return res.view('pages/transactions', { transactions });
  },

  // Add
  create: async (req, res) => {
    const { receiver, amount } = req.body;

    await Transaction.create({
      receiver,
      amount,
      owner: req.session.userId
    });

    return res.redirect('/transactions');
  },

  // Edit page
  edit: async (req, res) => {

    const transaction = await Transaction.findOne({
      id: req.params.id,
      owner: req.session.userId
    });

    if (!transaction) return res.forbidden();

    return res.view('pages/editTransaction', { transaction });
  },

  // Update
  update: async (req, res) => {
    const { receiver, amount } = req.body;

    await Transaction.updateOne({
      id: req.params.id,
      owner: req.session.userId
    }).set({ receiver, amount });

    return res.redirect('/transactions');
  },

  // Delete
  delete: async (req, res) => {

    await Transaction.destroyOne({
      id: req.params.id,
      owner: req.session.userId
    });

    return res.redirect('/transactions');
  }

};


