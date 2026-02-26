const { v4: uuidv4 } = require("uuid");
module.exports = {

  //to view dashboard and pass friends list
  index: async function (req, res) {
   
    const friends = await Friend.find({ owner: req.session.userId })
    .populate('friend');

    return res.view('pages/dashboard', { friends });


  }

};

