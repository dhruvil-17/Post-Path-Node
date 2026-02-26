module.exports = {
  // list transactions
  //fetching account details and transactions both
  //only the transactions which have "deletedAt" field null
  list: async (req, res) => {
    try {
      const accountId = req.query.account || "";
      const type = req.query.type || "";
      const search = req.query.search || "";

      //pagination limits
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      //fetching accounts
      const accounts = await Account.find({
        owner: req.session.userId,
        deletedAt: null,
      });

      //filter query
      let whereClause = {
        owner: req.session.userId,
        deletedAt: null,
      };

      // account filter
      if (accountId) {
        whereClause.or = [
          { account: accountId },
          { fromAccount: accountId },
          { toAccount: accountId },
        ];
      }

      // type filter
      if (type) {
        whereClause.type = type;
      }

      // category search
      if (search) {
        whereClause.category = {
          contains: search,
        };
      }
      //count
      const totalTransactions = await Transaction.count({
        where: whereClause,
      });

      ///fetching transactions
      const transactions = await Transaction.find({
        where: whereClause,
        sort: "transactionDate DESC",
        skip,
        limit,
      })
        .populate("account")
        .populate("fromAccount")
        .populate("toAccount");

      const totalPages = Math.ceil(totalTransactions / limit);

      return res.view("pages/transactions", {
        transactions,
        accounts,
        selectedAccount: accountId,
        type,
        search,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  // create transaction logic
  create: async (req, res) => {
    try {
      const {
        type,
        account,
        fromAccount,
        toAccount,
        amount,
        category,
        transactionDate,
      } = req.body;

      const amt = Number(amount);

      //transaction from one acount to another
      if (type === "transfer") {
        if (fromAccount === toAccount) {
          return res.json({
            success: false,
            message: "Accounts must be different",
          });
        }

        const fromAcc = await Account.findOne({ id: fromAccount });
        const toAcc = await Account.findOne({ id: toAccount });

        await Account.updateOne({ id: fromAcc.id }).set({
          balance: fromAcc.balance - amt,
        });

        await Account.updateOne({ id: toAcc.id }).set({
          balance: toAcc.balance + amt,
        });

        await Transaction.create({
          type,
          amount: amt,
          owner: req.session.userId,
          category,
          transactionDate,
          fromAccount,
          toAccount,
        });
      } else {
        //updating balance of accounts after transactions
        const acc = await Account.findOne({ id: account });

        let balance = acc.balance;

        if (type === "income") balance += amt;

        if (type === "expense") balance -= amt;

        await Account.updateOne({ id: acc.id }).set({ balance });

        await Transaction.create({
          type,
          amount: amt,
          account,
          owner: req.session.userId,
          category,
          transactionDate,
        });
      }

      return res.json({
        success: true,
        message: "Transaction saved",
      });
    } catch (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Transaction failed",
      });
    }
  },

  // update a transaction
  update: async (req, res) => {
    try {
      const { type, amount, category, note, transactionDate } = req.body;

      const transaction = await Transaction.findOne({
        id: req.params.id,
        owner: req.session.userId,
        deletedAt: null,
      });

      if (!transaction) {
        return res.json({
          success: false,
          message: "Transaction not found",
        });
      }

      await Transaction.updateOne({
        id: transaction.id,
      }).set({
        type,
        amount: Number(amount),
        category,
        note,
        transactionDate,
      });

      return res.json({
        success: true,
        message: "Transaction updated",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Update failed",
      });
    }
  },

  // soft delete
  //settinng the field "deletedAt" to not null
  delete: async (req, res) => {
    try {
      const transaction = await Transaction.findOne({
        id: req.params.id,
        owner: req.session.userId,
        deletedAt: null,
      });

      if (!transaction) {
        return res.json({
          success: false,
          message: "Transaction not found",
        });
      }

      await Transaction.updateOne({
        id: transaction.id,
      }).set({
        deletedAt: new Date(),
      });

      return res.json({
        success: true,
        message: "Transaction deleted",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Delete failed",
      });
    }
  },
};
