/**
 *  Find an Order
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const order = await Orders.findOne({
    id: params.orderId,
    idUser: req.userInfo.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  if (!order) {
    return res.notFound(
      {},
      {
        message: `The order doesn't exits`
      }
    );
  }

  let shopingData = await ShoppingCart.findOne({
    id: order.idShoppingCart,
    idUser: req.userInfo.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });
  if (!shopingData) {
    return res.notFound(
      {},
      {
        message: `The shopping cart doesn't exists`
      }
    );
  }
  shopingData.data = JSON.parse(shopingData.data);
  order.shoppingCart = shopingData;

  return res.ok(order);
};
