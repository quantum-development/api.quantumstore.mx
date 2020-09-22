/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findAll: async (req, res) => {
    let where = req.body.where || {};
    where = _.pick(where, ['name', 'imgThumbnail']);
    where.deleted = false;
    const page = req.body.page > 0 ? req.body.page - 1 : 0;
    const limit = req.body.limit;
    let items = await Items.find(where)
      .sort('sort DESC')
      .paginate(page, limit)
      .populate('prices')
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    for (const item of items) {
      const images = await ItemsImages.find({ idItem: item.id })
        .populate('idImage')
        .intercept(_err => {
          return res.badRequest(
            {},
            {
              message: `There an error on DB`
            }
          );
        });
      item.images = images.map(image => image.idImage);
      item.images = item.images.filter(image => image.deleted === false);
    }
    const data = {
      rows: items.length,
      data: items
    };
    return res.ok(data);
  },
  findCategory: async (req, res) => {
    let where = req.body.where || {};
    where = _.pick(where, ['name', 'imgThumbnail']);
    where.deleted = false;
    const page = req.body.page > 0 ? req.body.page - 1 : 0;
    const limit = req.body.limit;
    let category = req.category;
    let categoryItems = await CategoriesItems.find({
      where: { idCategory: category.id },
      select: ['idItem']
    })
      .paginate(page, limit)
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });

    // Find Items Acccording the category
    let itemsIds = categoryItems.map(categoryItem => categoryItem.idItem);
    where.id = { in: itemsIds };
    let items = await Items.find(where)
      .populate('prices')
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    for (const item of items) {
      const images = await ItemsImages.find({ idItem: item.id })
        .populate('idImage')
        .intercept(_err => {
          return res.badRequest(
            {},
            {
              message: `There an error on DB`
            }
          );
        });
      item.images = images.map(image => image.idImage);
      item.images = item.images.filter(image => image.deleted === false);
    }
    const data = {
      rows: items.length,
      data: items
    };
    return res.ok(data);
  },
  findItem: async (req, res) => {
    let item = req.item;
    const images = await ItemsImages.find({
      idItem: item.id
    })
      .populate('idImage')
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    if (images) {
      item.images = images.map(image => image.idImage);
      item.images = item.images.filter(image => image.deleted === false);
    } else {
      item.images = [];
    }

    for (const price of item.prices) {
      const purchase_options = await PricesPurchaseOptions.find({
        idPrice: price.id
      }).intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
      if (purchase_options) {
        price.purchase_options = purchase_options;
      } else {
        item.purchase_options = [];
      }
    }
    return res.ok(item);
  }
};
