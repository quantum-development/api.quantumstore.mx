/**
 * Este metodo verifica el token de correo valido
 *
 * @param {*} req
 * @param {*} res
 */

const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const params = req.allParams();

    const userToken = await jwt.verify(params.token, sails.config.custom.jwtSecret);

    let userInfo = await Users.findOne({
        username: userToken.username
    }).intercept(_err => {
        return res.badRequest(
            {},
            {
                message: `There an error on DB`
            }
        );
    });

    if (!userInfo) {
        return res.notFound(
            {},
            {
                message: `The username doesn't exists`
            }
        );
    }

    if (!(new Date(userToken.exp * 1000) > new Date())) {
        if (!userInfo.emailVerificated) {
            // Send new one
            // Send a Verification email token
            await sails.helpers.generateVerificationKey(userInfo);
        }

        return res.badRequest(
            {},
            {
                message: `Token expired`
            }
        );
    }

    // Update email Verificated
    const userUpdated = await Users.update({
        id: userInfo.id
    })
        .set({
            emailVerificated: 1
        })
        .fetch()
        .intercept(err => {
            return res.badRequest(
                {},
                {
                    message: `There an error on DB`
                }
            );
        });
    let user = userUpdated[0];

    // Generate Token
    const token = await sails.helpers.generateToken(user);
    user.oauth = {
        token: token.token,
        expiresIn: '24h',
        type: 'Bearer'
    };

    //Delete all the tokens create
    await Tokens.update({
        idUser: user.id
    })
        .set({
            deleted: true
        })
        .intercept(_err => {
            return res.badRequest(
                {},
                {
                    message: `There an error on DB`
                }
            );
        });

    // Save the Token data
    await Tokens.create({
        token: token.token,
        pwh: token.password,
        expiresIn: '24h',
        type: 'verify',
        userAgent: req.headers['user-agent'],
        idUser: user.id
    }).intercept(_err => {
        return res.badRequest(
            {},
            {
                message: `There an error on DB`
            }
        );
    });

    return res.ok(user);
};
