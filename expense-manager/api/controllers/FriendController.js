// api/controllers/FriendController.js
module.exports = {
  add: async (req, res) => {
    try {
      const { email } = req.body;
      const currentUserId = req.session.userId; // or JWT user id

      if (!email) {
        return res.badRequest({ error: 'Email is required' });
      }

      // find the user to add
      const friendUser = await User.findOne({ email });
      if (!friendUser) {
        return res.notFound({ error: 'User not found' });
      }

      // prevent self-add
      if (friendUser.id === currentUserId) {
        return res.badRequest({ error: 'You cannot add yourself' });
      }

      // check if already added
      const existing = await Friend.findOne({
        user: currentUserId,
        friend: friendUser.id,
      });

      if (existing) {
        return res.badRequest({ error: 'User already added' });
      }

      // create connection
      await Friend.create({
        user: currentUserId,
        friend: friendUser.id,
      });

      return res.ok({ message: 'User added successfully' });

    } catch (err) {
      sails.log.error(err);
      return res.serverError({ error: 'Something went wrong' });
    }
  }
};
