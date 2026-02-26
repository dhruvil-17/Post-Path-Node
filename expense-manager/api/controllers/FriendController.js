
module.exports = {
  add: async (req, res) => {
    try {
      const { email } = req.body;
      const currentUserId = req.session.userId; // or JWT user id
      
      if (!email) {
        return res.view('pages/addFriend' , {error: 'Email is required'});
      }

      //finding user in database which is to be added 
      const friendUser = await User.findOne({ email });
      if (!friendUser) {
        return res.status(404).json({
          success : false,
          message : "user not found"
        });
      }


      if (friendUser.id === currentUserId) {
        return res.status(400).json({
          success : false,
          message : "Cant Add Yourself"
        });
      }

      //checking existing friends
      const existing = await Friend.findOne({
        user: currentUserId,
        friend: friendUser.id,
      });

      if (existing) {
       return res.json({
          success : false,
          message : "User Already added"
        });
      }
      
      
      //creating friend
      await Friend.create({
        user: currentUserId,
        friend: friendUser.id,
      });

      return res.status(200).json({
        success : true,
        message : "User Added successfully"
        
      });

    } catch (err) {
      sails.log.error(err);
      return res.serverError({ error: 'Something went wrong' });
    }
  },

  //list users
  show: async (req, res) => {
  const FriendName = await User.find();

  return res.view('pages/addFriend', { FriendName });
},

};
