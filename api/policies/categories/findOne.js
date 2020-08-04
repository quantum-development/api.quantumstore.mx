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

  if (req.body.idCategory) {
    req.body.id = req.body.idCategory;
  }

  const category = await Categories.findOne({
    id: req.body.id,
    deleted: false
  });
  if (!category) {
    return res.badRequest(
      {},
      {
        message: 'The category isn´t valid'
      }
    );
  }

  req.category = category;

  return next();
};
