/**
 * JWT Auth Policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user via JWT token
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

const jwt = require('jsonwebtoken');

const TOKEN_RE = /^Bearer$/i;

module.exports = function(req, res, next) {
  let token = null;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (TOKEN_RE.test(scheme)) {
        token = credentials;
      }
    }
  } else {
    return res.badRequest(
      {},
      {
        message: 'No Authorization header was found'
      }
    );
  }
  if (!token) {
    return res.badRequest(
      {},
      {
        message: 'Format is "Authorization: Bearer [token]"'
      }
    );
  }

  jwt.verify(
    // Verify the token
    token,
    sails.config.custom.jwtSecret,
    {},
    async err => {
      if (err) {
        return res.forbidden();
      }
      // Validatte the token
      const tokenInfo = await Tokens.findOne({
        token: token,
        deleted: false
      }).intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });

      if (!tokenInfo) {
        return res.badRequest();
      }

      // // Verify the device user agent
      // if (
      //   req.headers['user-agent'] !== tokenInfo.userAgent &&
      //   req.headers['user-agent'] !== 'axios/0.19.2'
      // ) {
      //   return res.badRequest();
      // }

      // Find the user exits
      const user = await Users.findOne({
        id: tokenInfo.idUser
      }).intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
      req.userInfo = user;
      req.userInfo.tokenId = tokenInfo.id;
      return next();
    }
  );
};
