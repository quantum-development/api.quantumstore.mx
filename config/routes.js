/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // OAUTH
  'POST /users/oauth/register': {
    action: 'oauth/register'
  },
  'POST /users/oauth/login': {
    action: 'oauth/login'
  },
  'GET /users/oauth/verify': {
    action: 'oauth/verify'
  },
  'POST /users/oauth/change': {
    action: 'oauth/change'
  },
  'POST /users/oauth/forgot': {
    action: 'oauth/forgot'
  },
  'POST /users/oauth/reset': {
    action: 'oauth/reset'
  },
  'POST /users/oauth/logout': 'OauthController.logout',
  'GET /users/oauth/info': 'OauthController.tokenInfo',
  //SETTINGS
  'PATCH /users/settings/:id': {
    action: 'settings/update'
  },
  'DELETE /users/settings/:id': {
    action: 'settings/destroy'
  },
  'GET /users/settings/:idUser': 'SettingsController.findByUser',
  // USERS (Me)
  'GET /users/users/me': 'UsersController.findOne',
  'PATCH /users/users/me': {
    action: 'users/update'
  },
  // Openpay Cards Create
  'POST /users/cards/create': {
    action: 'cards/create'
  },
  'GET /users/cards/find': {
    action: 'cards/find'
  },
  'DELETE /users/cards/:id': {
    action: 'cards/destroy'
  },
  // Openpay Customer Create
  'POST /users/customers/create': {
    action: 'customers/create'
  },
  'GET /users/customers/find': {
    action: 'customers/find'
  },
  // Items
  'POST /items/create': {
    action: 'items/create'
  },
  'GET /items/find': 'ItemsController.findAll',
  'GET /items/:id': 'ItemsController.findItem',
  'GET /items/category/:id': 'ItemsController.findCategory',
  // Shopping Cart
  'POST /shopping/add': {
    action: 'shopping/create'
  },
  'POST /shopping/delete': {
    action: 'shopping/delete'
  },
  'GET /shopping/find': 'ShoppingController.findCart',
  'POST /shopping/set': 'ShoppingController.setCart',
  // Categories
  'POST /categories/create': {
    action: 'categories/create'
  },
  'GET /categories/find': 'CategoriesController.findAll',
  'GET /categories/:id': 'CategoriesController.findCategory',
  'POST /categories/items': 'CategoriesController.categoryItem',
  // Permissions CODES
  'POST /users/permissions': 'PermissionsController.index',
  // Order
  'POST /orders/create': {
    action: 'orders/create'
  },
  'GET /users/orders/find': {
    action: 'orders/find'
  },
  // Notifications CODES
  'POST /notifications/contact': {
    action: 'notifications/contact'
  },
  'POST /notifications/subscription': {
    action: 'notifications/subscription'
  },
  // other services
  'POST /services/checkcode': {
    action: 'services/code'
  },
  // Permissions INIT
  'POST /users/permissions/init': 'PermissionsController.init',
  'GET /users/': 'PingController.index',
  'GET /': 'PingController.index'
};
