/**
 *  Find an Order
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  try {
    const order = await Orders.findOne({
      id: params.orderId,
      idUser: req.userInfo.id
    });
    if (!order) {
      return res.notFound(
        {}, {
        message: `The order doesn't exits`
      }
      );
    }

    const shopingData = await ShoppingCart.findOne({
      id: order.idShoppingCart,
      idUser: req.userInfo.id
    });
    if (!shopingData) {
      return res.notFound(
        {}, {
        message: `The shopping cart doesn't exists`
      }
      );
    }
    shopingData.data = JSON.parse(shopingData.data);
    order.shoppingCart = shopingData;

    order.items = await OrdersItems.find({
      idOrder: params.orderId
    });

    return res.ok(order);

  } catch (e) {
    return res.badRequest(
      {}, {
      message: `Error finding the order: ${e}`
    }
    );
  }
};
