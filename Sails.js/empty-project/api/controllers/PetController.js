/**
 * PetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
   
    sound : function(req, res) {
        return res.send('Pet just made a sound!');
    }

};

