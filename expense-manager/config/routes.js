
module.exports.routes = {


  '/': { view: 'pages/homepage' },
  //signup
 'GET /signup': { view: 'pages/signup' },
  'POST /signup': 'AuthController.signup',
  //login
  'GET /login': { view: 'pages/login' },
  'POST /login': 'AuthController.login',
  //auth dashboard
  'GET /dashboard': { view: 'pages/dashboard'  },
  //logout
  'GET /logout': 'AuthController.logout',
  //account CRUD
  'GET /accounts': 'AccountController.list',
  'GET /accounts/new' : 'AccountController.new',
  'POST /accounts': 'AccountController.create',
  'GET /accounts/edit/:id': 'AccountController.edit',
  'POST /accounts/update/:id': 'AccountController.update',
  'POST /accounts/delete/:id': 'AccountController.delete',

  // add users
  // config/routes.js
  'GET /friends': {view : 'pages/addFriend'}, 
  'POST /friends/add': 'FriendController.add',




};
