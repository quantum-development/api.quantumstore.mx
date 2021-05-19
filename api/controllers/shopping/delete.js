const validateJSON = value => {
  try {
    return JSON.parse(value);
  } catch (e) {
    e = false;
    return e;
  }
};
/**
 *  Create AddItems
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  let findData = {
    idUser: params.idUser,
    fingerprint: params.fingerPrint,
    deleted: false,
    finished: false
  };

  findData.idUser = findData.idUser === 0 ? null : findData.idUser;

  //Get Shipping Cart
  let shopingData = await ShoppingCart.findOne(findData).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  let data = {};

  if (shopingData) {
    const dataCart = shopingData.data;
    let dataCartJson = validateJSON(dataCart);
    let items = dataCartJson.items;
    items = _.remove(items, item => item.id !== req.item.id);
    dataCartJson.items = items;
    data = dataCartJson;
  }

  const whereUpdate = {
    id: shopingData.id
  };

  let shoppingTotal = 0;
  if (data.items) {
    data.items.forEach(item => {
      shoppingTotal += item.total;
    });
  }

  data = JSON.stringify(data);

  const dataToUpdate = {
    total: shoppingTotal,
    data
  };

  let cartUpdate = await ShoppingCart.update(whereUpdate)
    .set(dataToUpdate)
    .fetch()
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });

  data = validateJSON(data);

  cartUpdate = cartUpdate[0];

  cartUpdate = {
    ...cartUpdate,
    data
  };

  return res.ok(cartUpdate);
};
