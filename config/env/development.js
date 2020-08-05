const mysql = require('sails-mysql');
const staticsVariables = require('./staticsVariables.js');
const db_host = process.env.DB_HST || '0.0.0.0:4306';
const db_user = process.env.DB_USR || 'root';
const db_pwd = process.env.DB_PWD || 'root';
const db_name = process.env.DB_NME || 'qrewards';
module.exports = {
  port: process.env.PORT || 1600,
  datastores: {
    default: {
      adapter: mysql,
      url: `mysql://${db_user}:${db_pwd}@${db_host}/${db_name}`
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
