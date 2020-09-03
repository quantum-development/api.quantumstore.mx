module.exports.policies = {
  '*': false,

  PingController: {
    '*': false,
    index: true
  },
  PermissionsController: {
    '*': false,
    index: ['permissions/permissions'],
    init: ['permissions/init']
  },
  OauthController: {
    '*': false,
    register: [
      'oauth/register',
      'userData',
      'isTheUsernameTaken',
      'isEmail',
      'isTheEmailTaken'
    ],
    login: ['oauth/login'],
    verify: ['oauth/verify'],
    change: ['oauth/change', 'hasToken'],
    forgot: ['oauth/forgot'],
    reset: ['oauth/reset'],
    logout: ['hasToken'],
    tokenInfo: ['hasToken']
  },
  UsersController: {
    '*': false,
    findOne: ['hasToken'],
    update: ['userData', 'hasToken']
  },
  SettingsController: {
    '*': true,
    destroy: ['hasToken', 'settings/destroy'],
    update: ['settings/update', 'hasToken'],
    findByUser: ['hasToken']
  },
  TokensController: {
    '*': false
  },
  CardsController: {
    '*': false,
    create: ['hasToken', 'cards/params', 'hasDeviceId', 'customer'],
    find: ['hasToken', 'customer'],
    destroy: ['hasToken', 'customer']
  },
  CustomersController: {
    '*': false,
    create: ['hasToken', 'customers/params'],
    find: ['hasToken', 'customer']
  },
  ItemsController: {
    '*': false,
    create: ['hasToken', 'items/params'],
    findAll: ['validPage'],
    findItem: ['items/findOne'],
    findCategory: ['validPage', 'categories/findOne']
  },
  CategoriesController: {
    '*': false,
    create: ['hasToken', 'categories/params'],
    findAll: ['validPage'],
    findCategory: ['categories/findOne'],
    categoryItem: [
      'hasToken',
      'categories/categoryItem',
      'categories/findOne',
      'items/findOne'
    ]
  },
  ShoppingController: {
    '*': false,
    create: [
      'shopping/params',
      'shopping/item',
      'shopping/amount',
      'items/findOne'
    ],
    delete: ['shopping/params', 'shopping/item', 'items/findOne'],
    findCart: ['shopping/params'],
    setCart: ['hasToken', 'shopping/params']
  },
  ImagesController: {
    '*': false,
    create: ['hasToken', 'images/params']
  },
  NotificationsController: {
    '*': false,
    contact: ['isEmail', 'contact/params'],
    subscription: ['isEmail']
  },
  OrdersController: {
    '*': false,
    create: ['hasToken', 'orders/params', 'hasDeviceId', 'customer'],
    find: ['hasToken']
  }
};
