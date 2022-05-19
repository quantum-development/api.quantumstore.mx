/**
 *  Find all Order
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();
  const page = params.page || 1;
  const ITEMS_PER_PAGE = 20;

  try {
    const orders = await Orders.find({
      idUser: req.userInfo.id,
      deleted: 0
    })
      .sort([
        { createdAt: 'DESC' },
      ])
      .skip(page * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    if (!orders) {
      return res.notFound(
        {}, {
        message: `There is no purchase order`
      }
      );
    }

    return res.ok(orders);

  } catch (e) {
    return res.badRequest(
      {}, {
      message: `Error getting all the orders: ${e}`
    }
    );
  }
};
