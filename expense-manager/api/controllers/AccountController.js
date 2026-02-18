
module.exports = {

  list: async function (req, res) {
    const accounts = await Account.find({
      owner: req.session.userId
    });

    return res.view('pages/accounts', { accounts });
  },

  new: function (req, res) {
    return res.view('pages/newAcc');
  },

  create: async function (req, res) {
    const { name, balance } = req.body;

    await Account.create({
      name,
      balance,
      owner: req.session.userId
    });

    return res.redirect('/accounts');
  },

  edit: async function (req,res) {
    const account =await Account.findOne({
      id: req.params.id,
      owner: req.session.userId
    });

    if (!account) {
      return res.notFound();
    }

    return res.view('pages/editAcc', { account });
  },

  update : async function (req, res) {
    const { name, balance } = req.body;

    await Account.updateOne({
      id: req.params.id,
      owner: req.session.userId
    }).set({
      name,
      balance
    });

    return res.redirect('/accounts');
  },

  delete : async function (req,res) {
    await Account.destroyOne({
      id: req.params.id,
      owner: req.session.userId
    });

    return res.redirect('/accounts');
  }
};
