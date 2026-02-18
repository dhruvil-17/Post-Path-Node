module.exports.policies = {

  
  '*': 'isAuthenticated',

  
  AuthController: {
    '*': true,
    'logout': 'isAuthenticated'
  }
};
