/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {

    order: [
      'requestLogger',
      'register',
      'keepAlive',
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router'
    ],

    register: (function() {
      return async function(req, res, next) {
        req.headers.id = req.headers.id || 'UNKNOWN ID';

        if (_.contains(sails.config.custom.URL_NOT_LOGS, req.path)) {
          return next();
        }
        return next();
      };
    })(),

    keepAlive: (function() {
      return function(req, res, next) {
        res.set('Connection', 'keep-alive');
        return next();
      };
    })(),

    requestLogger: (function() {
      return function(req, res, next) {
        console.log('Request: ' + req.method + ' ' + req.path);
        return next();
      };
    })()

    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),
  }
};
