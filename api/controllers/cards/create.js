/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const cardData = {
    // holder_name: params.holderName,
    // card_number: params.cardNumber,
    // expiration_year: params.expiredYear,
    // expiration_month: params.expiredMonth,
    // cvv2: params.cvv,
    token_id: params.token_id,
    device_session_id: params.deviceSesionId,
    customerId: req.customer.customerId
  };

  const card = await sails.helpers.openpayCards(cardData, 'create');

  if (!card) {
    return res.badRequest(
      {},
      {
        message: `The card can't created`
      }
    );
  }

  // Card creation
  const createCard = await Cards.create({
    idCustomer: req.customer.id,
    cardId: card.id
  })
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();

  return res.ok(createCard);
};
