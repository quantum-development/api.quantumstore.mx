/**
 *  Create Contact
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const contactParams = {
    name: params.name,
    email: params.email,
    subject: params.subject,
    message: params.message
  };

  // Card creation
  const createdContact = await Contacts.create(contactParams)
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();

  return res.ok(createdContact);
};
