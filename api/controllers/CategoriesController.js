/**
 * CategoriesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findAll: async (req, res) => {
    let where = req.body.where || {};
    where = _.pick(where, ['name']);
    where.deleted = false;
    const page = req.body.page > 0 ? req.body.page - 1 : 0;
    const limit = req.body.limit;
    let categories = await categories
      .find(where)
      .paginate(page, limit)
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    const data = {
      rows: categories.length,
      data: categories
    };
    return res.ok(data);
  },
  findCategory: async (req, res) => {
    let category = req.category;
    return res.ok(category);
  },
  categoryItem: async (req, res) => {
    let category = req.category;
    let item = req.item;
    let categoryItem = await CategoriesItems.findOne({
      idCategory: category.id,
      idItem: item.id
    });
    if (!categoryItem) {
      categoryItem = await CategoriesItems.create({
        idCategory: category.id,
        idItem: item.id
      })
        .fetch()
        .intercept(_err => {
          return res.badRequest(
            {},
            {
              message: `There an error on DB`
            }
          );
        });
    }
    return res.ok(categoryItem);
  }
};
