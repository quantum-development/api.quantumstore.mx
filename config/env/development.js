const mysql = require('sails-mysql');
const staticsVariables = require('./staticsVariables.js');
module.exports = {
  port: 1600,
  datastores: {
    default: {
      adapter: mysql,
      url: 'mysql://root:root@0.0.0.0:4306/qrewards'
    }
  },
  models: {
    migrate: 'safe'
    // cascadeOnDestroy: false,
  },

  blueprints: {
    shortcuts: false
  },
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: false,
      allowRequestMethods: 'GET, POST, PATCH, DELETE, OPTIONS, HEAD',
      allowRequestHeaders:
        'Content-Type,Authorization,User-Agent,Referer'
    }
  },
  session: {
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  },
  sockets: {
    onlyAllowOrigins: []
  },
  log: {
    level: 'info'
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000
  },
  custom: {
    jwtSecret:
      'd90bf91f9ec052a63849041f899e05e57a3b865a503cd6ef5732f4e51c216e09',
    jwtKey: 'qgZTCIb7CgriyMKms9HhHNiWFVWr7djo',
    ...staticsVariables
  }
};
