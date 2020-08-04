'use strict';

/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */

const _ = require('lodash');

module.exports = function(data, config) {
  let msgData = data;
  if (process.env.NODE_ENV === 'production') {
    msgData = data.raw.code;
  }
  const response = _.assign(
    {
      code: _.get(config, 'code', 'E_INTERNAL_SERVER_ERROR'),
      message: _.get(config, 'message', 'Something bad happened on the server'),
      data: msgData || {}
    },
    _.get(config, 'root', {})
  );
  return this.res.status(500).json(response);
};
