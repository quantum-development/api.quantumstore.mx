/**
 * findOne.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate params to findOne layout
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();
  if (req.body.idItem) {
    req.body.id = req.body.idItem;
  }
  const item = await Items.findOne({
    id: req.body.id,
    deleted: false
  }).populate('prices');
  if (!item) {
    return res.badRequest(
      {},
      {
        message: 'The item isn´t valid'
      }
    );
  }

  req.item = item;

  return next();
};
