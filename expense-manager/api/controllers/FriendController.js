// api/controllers/FriendController.js
module.exports = {
  add: async (req, res) => {
    try {
      const { email } = req.body;
      const currentUserId = req.session.userId; // or JWT user id
      
      if (!email) {
        return res.view('pages/addFriend' , {error: 'Email is required'});
      }


      const friendUser = await User.findOne({ email });
      if (!friendUser) {
        return res.view('pages/addFriend' , {error: 'User not found'});
      }


      if (friendUser.id === currentUserId) {
        return res.view('pages/addFriend' , {error: 'You cannot add yourself'});
      }


      const existing = await Friend.findOne({
        user: currentUserId,
        friend: friendUser.id,
      });

      if (existing) {
        return res.view('pages/addFriend' , {error: 'User already added'});
      }
      
      

      await Friend.create({
        user: currentUserId,
        friend: friendUser.id,
      });

      return res.view('pages/addFriend' , {success: 'User added successfully'});

    } catch (err) {
      sails.log.error(err);
      return res.serverError({ error: 'Something went wrong' });
    }
  },
  show: async (req, res) => {
  const FriendName = await User.find();

  return res.view('pages/addFriend', { FriendName });
},

};
