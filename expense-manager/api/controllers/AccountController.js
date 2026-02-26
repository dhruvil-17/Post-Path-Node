const { v4: uuidv4 } = require("uuid");

module.exports = {
  // fetch accounts
  list: async function (req, res) {
    try {
      const accounts = await Account.find({
        owner: req.session.userId,
        deletedAt: null,
      });

      return res.view("pages/accounts", { accounts });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // open add account page
  new: function (req, res) {
    return res.view("pages/newAcc");
  },

  // create account
  create: async function (req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(500).json({
          success: false,
          message: "Account Name is Required",
        });
      }

      // taking account number from uuid helper
      const accountNumber = await sails.helpers.generateAccountNumber();

      await Account.create({
        name: name.trim(),
        accountNumber,
        owner: req.session.userId,
      });

      return res.json({
        success: true,
        message: "Account created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to create account",
      });
    }
  },

  // open edit page
  edit: async function (req, res) {
    try {
      const account = await Account.findOne({
        id: req.params.id,
        owner: req.session.userId,
        deletedAt: null,
      });

      if (!account) {
        return res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }

      return res.view("pages/editAcc", { account });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // update account
  update: async function (req, res) {
    try {
      const { name, balance } = req.body;

      const account = await Account.findOne({
        id: req.params.id,
        owner: req.session.userId,
        deletedAt: null,
      });

      if (!account) {
        return res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }

      await Account.updateOne({
        id: account.id,
      }).set({
        name: name.trim(),
        balance: Number(balance),
      });

      return res.json({
        success: true,
        message: "Account updated successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update account",
      });
    }
  },

  // delete acc (SOFT DELETE)
  delete: async function (req, res) {
    try {
      const account = await Account.findOne({
        id: req.params.id,
        owner: req.session.userId,
        deletedAt: null,
      });

      if (!account) {
        return res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }

      // prevent deleting default account
      if (account.isDefault) {
        return res.json({
          success: false,
          message: "Default account cannot be deleted",
        });
      }

      //soft delete (not actual delete from db)
      await Account.updateOne({
        id: account.id,
      }).set({
        deletedAt: new Date(),
      });

      return res.json({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete account",
      });
    }
  },
};
