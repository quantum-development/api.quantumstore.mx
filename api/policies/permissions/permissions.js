/**
 * Permissions.js
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated system
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  global.callId = req.headers.id;
  if (_.isEmpty(req.body.token)) {
    return res.badRequest({}, {
      message: 'Token is required in body.'
    });
  }
  if (_.isEmpty(req.body.path)) {
    return res.badRequest({}, {
      message: 'Path is required in body.'
    });
  }
  if (_.isEmpty(req.body.method)) {
    return res.badRequest({}, {
      message: 'Method is required in body.'
    });
  }

  let token = req.body.token.split('..Bearer ');
  req.body.token = token[1];
  var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  let pathRegex = req.body.path.split('/');
  let path = '';
  pathRegex.shift();
  pathRegex.forEach((element) => {
    if (checkForHexRegExp.test(element)) {
      element = 'id';
    }
    path += '/' + element;
  });
  req.body.path = path;
  return next();
};
