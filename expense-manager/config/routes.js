

module.exports.routes = {


  '/': { view: 'pages/signup' },
  //signup
  'GET /signup': { view: 'pages/signup' },
  'POST /signup': 'AuthController.signup',
  //login
  'GET /login': { view: 'pages/login' },
  'POST /login': 'AuthController.login',
  //auth dashboard
  'GET /dashboard': 'DashboardController.index',

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
  'GET /friends': 'FriendController.show',
  'POST /friends/add': 'FriendController.add',

  //Transaction CRUD
  'GET /transactions': 'TransactionController.list',
  'POST /transactions/create': 'TransactionController.create',
  'GET /transactions/:id/edit': 'TransactionController.edit',
  'POST /transactions/:id/update': 'TransactionController.update',
  'POST /transactions/:id/delete': 'TransactionController.delete',





};
