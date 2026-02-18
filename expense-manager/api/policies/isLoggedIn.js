module.exports = async function (req, res, proceed) {
  if (req.session.userId) {
   
    return proceed();
    
  }

  // Not logged in → redirect to login
  return res.redirect('/login');
};
