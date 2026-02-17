/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    greet : function(req, res) {
        return res.send('Hello, welcome to Sails.js!');
    },
    displayName : async function(req, res) {
    // 1. Get the ID from the URL (e.g., /user/show-name/1)
    const userId = req.param('id');

    // 2. Fetch the user from the database
    // .findOne() returns a single object or undefined
    const user = await User.findOne({ id: userId });

    // 3. Check if user exists
    if (!user) {
      return res.status(404).send('User not found');
    }

    // 4. Return just the name
    return res.send(`The user's name is: ${user.fullName}`);
}
}

