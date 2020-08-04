/**
 *  Create Categorie
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const categoryData = {
    name: params.name
  };

  // Card creation
  const createdCategory = await Categories.create(categoryData)
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();

  return res.ok(createdCategory);
};
