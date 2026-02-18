/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {

    const friends = await Friend.find({ owner: req.session.userId })
    .populate('friend');

    return res.view('pages/dashboard', { friends });


  }

};

