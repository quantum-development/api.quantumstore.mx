// Defining ESLint environments
/* eslint-env node, mocha */

const sails = require('sails');
global.expect200 = () => {
  return {
    status: 200,
    code: 'OK',
    message: 'Operation is successfully executed'
  };
};
global.expect400 = (message = false) => {
  return {
    status: 400,
    code: 'E_BAD_REQUEST',
    message: message || 'The request cannot be fulfilled due to bad syntax'
  };
};
global.expect401 = (message = false) => {
  return {
    status: 401,
    code: 'E_UNAUTHORIZED',
    message: message || 'Missing or invalid authentication token'
  };
};
global.expect403 = () => {
  return {
    status: 403,
    code: 'E_FORBIDDEN',
    message: 'User not authorized to perform the operation'
  };
};
global.expect404 = (message = false) => {
  return {
    status: 404,
    code: 'E_NOT_FOUND',
    message:
      message ||
      'The requested resource could not be found but may be available again in the future'
  };
};
global.expect500 = () => {
  return {
    status: 500,
    code: 'E_INTERNAL_SERVER_ERROR',
    message: 'Something bad happened on the server'
  };
};

beforeEach(() => {
  global.custom = require('../config/env/staticsVariables');
  global.chai = require('chai');
  chai.should();
  global.chaiHttp = require('chai-http');
  global.sinon = require('sinon');
  global.sinonChai = require('sinon-chai');
  global.mock = require('mock-require');
  global.chaiString = require('chai-string');
  chai.use(chaiString);
  chai.use(chaiHttp);
  chai.use(sinonChai);
  global.expect = require('chai').expect;
  global.server = 'http://localhost:1410';
  global.checkHeaders = function(res, statusCode) {
    res.should.have.status(statusCode);
    res.should.have.header('content-type', 'application/json; charset=utf-8');
  };
  global.checkHeadersImage = function(res, statusCode) {
    res.should.have.status(statusCode);
    res.should.have.header('content-type', 'image/png');
  };
});

// Start sails app
before(function(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(0);
  sails.lift(
    {
      port: 1410,
      log: {
        level: 'silent'
      },
      models: {
        migrate: 'safe'
      }
    },
    err => {
      if (err) {
        return done(err);
      }
      done(err, sails);
    }
  );
});

// Stop sails app
after(done => {
  sails.lower(done);
});
