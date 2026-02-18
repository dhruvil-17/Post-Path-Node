


const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
 
  const token = req.session.jwt;

  if (!token) {
  
    return res.redirect('/login');
    
  }

  try {
    const decoded = jwt.verify(token, sails.config.custom.jwtSecret);
    req.userId = decoded.userId;
    return proceed();
  } catch (err) {
    console.log(err)
    return res.redirect('/login');
  }
};
