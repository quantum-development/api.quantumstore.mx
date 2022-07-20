/**
 * Este metodo genera el registro de un nuevo usuario
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const recaptcha = await sails.helpers.recaptcha(
    params['g-recaptcha-response'],
    req.connection.remoteAddress
  );

  if (!recaptcha) {
    return res.badRequest(
      {},
      {
        message: `reCaptcha is invalid.`
      }
    );
  }

  // Create new user
  let newUser = await Users.create({
    password: params.password,
    name: params.name,
    lastName: params.lastName,
    birthdate: params.birthdate,
    gender: params.gender,
    email: params.email,
    phone: params.phone || null,
    street: params.street,
    district: params.district,
    city: params.city,
    codpost: params.codpost,
    emailVerificated: 1, // Temporal without email validation 1/2
  })
    .intercept(err => {
      return res.negotiate(err);
    })
    .fetch();

  // Send a Verification email token
  // await sails.helpers.generateVerificationKey(newUser); // Temporal without email validation 2/2

  // Get New token
  const token = await sails.helpers.generateToken(newUser);
  newUser.oauth = {
    token: token.token,
    expiresIn: '48h',
    type: 'Bearer'
  };
  await Tokens.create({
    token: token.token,
    pwh: token.password,
    expiresIn: '48h',
    type: 'register',
    userAgent: req.headers['user-agent'],
    idUser: newUser.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  return res.ok(newUser);
};
