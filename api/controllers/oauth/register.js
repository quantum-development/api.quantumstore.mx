/**
 * Este metodo genera el registro de un nuevo usuario
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  // Create new user
  let newUser = await Users.create({
    username: params.username,
    password: params.password,
    name: params.name,
    lastName: params.lastName,
    birthdate: params.birthdate,
    gender: params.gender,
    email: params.email,
    phone: params.phone || null
  })
    .intercept(err => {
      return res.negotiate(err);
    })
    .fetch();

  // Get New token
  const token = await sails.helpers.generateToken(newUser);
  newUser.oauth = {
    token: token.token,
    expiresIn: '24h',
    type: 'Bearer'
  };
  await Tokens.create({
    token: token.token,
    pwh: token.password,
    expiresIn: '24h',
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
