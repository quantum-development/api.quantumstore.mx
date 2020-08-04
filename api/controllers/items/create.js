/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const itemData = {
    name: params.name,
    description: params.description
  };

  // Card creation
  const createdItem = await Items.create(itemData)
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();

  for (const price of params.prices) {
    await Prices.create({
      price,
      idItem: createdItem.id
    }).intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });
  }

  const itemRes = {
    prices: params.prices,
    ...createdItem
  };

  return res.ok(itemRes);
};
