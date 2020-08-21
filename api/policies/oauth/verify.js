/**
 * Oauth.register
 *
 * @module      :: Policy
 * @description :: Simple policy to validate email
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
    const params = req.allParams();

    /*******************
     * TOKEN
     ********************/
    // Shouldn´t authenticate without token
    if (!params.token) {
        return res.badRequest(
            {},
            {
                message: 'The token is required'
            }
        );
    }

    try {
        var decoded = jwt.verify(params.token, sails.config.custom.jwtSecret);
    } catch (err) {
        return res.badRequest(
            {},
            {
                message: 'The token is invalid'
            }
        );
    }
    return next();
};
