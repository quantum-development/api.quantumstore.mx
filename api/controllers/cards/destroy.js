/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const card = await Cards.findOne({
    id: params.id,
    idCustomer: req.customer.id,
    deleted: false
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  if (!card) {
    return res.notFound(
      {},
      {
        message: `The card doesn't exits`
      }
    );
  }

  const cardData = {
    customerId: req.customer.customerId,
    cardId: card.cardId
  };

  const deleteCard = await sails.helpers.openpayCards(cardData, 'delete');

  if (!deleteCard) {
    return res.badRequest(
      {},
      {
        message: `The card can't delete`
      }
    );
  }

  await Cards.update({
    id: params.id
  })
    .set({
      deleted: true
    })
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });

  return res.ok(null, {
    message: 'The card was deleted correctly.'
  });
};
