/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = { 
  greet : function(req, res) {
    return res.send({message: "Hello from UserController!"});
  }
};

