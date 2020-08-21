staticsVariables = {
  app: 'API QREWARDS',
  version: '1.0.0',
  recaptcha: {
    url: 'https://www.google.com/recaptcha/api/siteverify',
    secretKey: '6LfDGagUAAAAALtJjAYzJzUtJa49uB2bn3thINHB'
  },
  PAGE_DEFAULT_NUMBER: 1,
  LIMIT_DEFAULT_NUMBER: 15,
  ALLOW_GENDERS: ['Male', 'Female', 'Other'],
  ALLOWED_CONTENT_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_OBJECT_TYPES: ['users', 'items'],
  FIELDS_TO_REPLACED: ['password'],
  MAX_BYTES: 2 * 1000 * 1000,
  RESIZE: {
    '700x500': {
      width: 700,
      height: 500
    },
    '200x150': {
      width: 200,
      height: 150
    }
  },
  ENCRYPT_PASS: 'Qrewards_2020'
};
module.exports = staticsVariables;
console.log(`${staticsVariables.app} - ${staticsVariables.version}`);
