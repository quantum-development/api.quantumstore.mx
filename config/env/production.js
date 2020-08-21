const mysql = require('sails-mysql');
const staticsVariables = require('./staticsVariables.js');
module.exports = {
  port: process.env.PORT || 8080,
  datastores: {
    default: {
      adapter: mysql,
      url: `mysql://b38626349c5538:1038bad9@us-cdbr-east-02.cleardb.com/heroku_cedea9dd92f6346?reconnect=true`
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
      allowRequestHeaders: 'Content-Type,Authorization,User-Agent,Referer'
    }
  },
  session: {
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  },
  sockets: {
    onlyAllowOrigins: ['https://www.quantumstore.com.mx']
  },
  log: {
    level: 'info'
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000
  },
  custom: {
    openpay: {
      id: 'mqfufzvnqrp2nyezxoub',
      privateKey: 'sk_edfa5574382841118d0b7f7786b2862b',
      production: true
    },
    app: {
      web: 'https://www.quantumstore.com.mx/'
    },
    email_provider: {
      url: 'https://api.qrewards.mx/store/notifications/'
    },
    jwtSecret:
      'd90bf91f9ec052a63849041f899e05e57a3b865a503cd6ef5732f4e51c216e09',
    jwtKey: 'qgZTCIb7CgriyMKms9HhHNiWFVWr7djo',
    ...staticsVariables
  }
};
