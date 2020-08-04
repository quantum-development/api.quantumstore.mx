/**
 * function to validate the max cardLength acording to the card
 */
const validateCardLength = (field, value, min, max) => {
  if (!_.inRange(value.length, min, max + 1)) {
    return 'The ' + field + ' should be length max ' + max + ' chars';
  }
  return false;
};

/**
 * params.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate card parameters
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
const cardvalidate = require('credit-card-validation');
module.exports = async (req, res, next) => {
  req.body = req.allParams();

  /**
   * validate holderName
   * holderName should be required
   * holderName should be string
   * holderName should be length between 2 and 100 chars
   */
  if (!req.body.holderName || !_.isString(req.body.holderName)) {
    return res.badRequest(
      {},
      {
        message: 'The holderName is required or corrupted'
      }
    );
  }

  //validate the length of the string
  if (!_.inRange(req.body.holderName.length, 2, 101)) {
    return res.badRequest(
      {},
      {
        message: 'The holderName should be between 5 and 100 chars'
      }
    );
  }

  /**
   * validate cardNumber
   * cardNumber should be required
   * cardNumber should be string
   * cardNumber should be length only 16 chars
   */
  if (!req.body.cardNumber || !_.isString(req.body.cardNumber)) {
    return res.badRequest(
      {},
      {
        message: 'The cardNumber is required or corrupted'
      }
    );
  }

  const card = cardvalidate(req.body.cardNumber);
  const cardType = card.getType();

  const cardMinLength = cardType === 'amex' ? 15 : 16;
  const cardMaxLength = 16;
  //validate the length of the string
  let message = validateCardLength(
    'cardNumber',
    req.body.cardNumber,
    cardMinLength,
    cardMaxLength
  );
  if (message) {
    return res.badRequest(
      {},
      {
        message: message
      }
    );
  }

  /**
   * validate if the cardNumber is valid
   */
  if (!card.isValid()) {
    return res.badRequest(
      {},
      {
        message: 'The cardNumber isn\'t valid'
      }
    );
  }

  /**
   * validate expiredYear
   * expiredYear should be required
   * expiredYear should be string
   */
  if (!req.body.expiredYear || !_.isString(req.body.expiredYear)) {
    return res.badRequest(
      {},
      {
        message: 'The expiredYear is required or corrupted'
      }
    );
  }

  //validate the length of the string
  if (req.body.expiredYear.length !== 2) {
    return res.badRequest(
      {},
      {
        message: 'The expiredYear should 2 chars'
      }
    );
  }

  /**
   * validate expiredMonth
   * expiredMonth should be required
   * expiredMonth should be string
   */
  if (!req.body.expiredMonth || !_.isString(req.body.expiredMonth)) {
    return res.badRequest(
      {},
      {
        message: 'The expiredMonth is required or corrupted'
      }
    );
  }

  //validate the length of the string
  if (req.body.expiredMonth.length !== 2) {
    return res.badRequest(
      {},
      {
        message: 'The expiredMonth should 2 chars'
      }
    );
  }

  /**
   * validate cvv
   * cvv should be required
   * cvv should be string
   */
  if (!req.body.cvv || !_.isString(req.body.cvv)) {
    return res.badRequest(
      {},
      {
        message: 'The cvv is required or corrupted'
      }
    );
  }

  //validate cvv digits
  const cvvMaxLength = cardType === 'amex' ? 5 : 4;
  //validate the length of the string
  if (!_.inRange(req.body.cvv.length, 3, cvvMaxLength)) {
    return res.badRequest(
      {},
      {
        message: 'The cvv should be only ' + (cvvMaxLength - 1) + ' chars'
      }
    );
  }

  return next();
};
