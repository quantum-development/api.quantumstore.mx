/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const cardData = {
    token_id: params.token_id,
    device_session_id: params.deviceSesionId,
    customerId: req.customer.customerId
  };

  try {
    const {
      id: cardId,
      customer_id: keyCustomer
    } = await sails.helpers.openpayCards(cardData, 'create');

    const idCustomer = req.customer.id;
    const card = { idCustomer, cardId };
    // console.log("controllers/cards/create.js", "card", card);

    // Card creation
    const createCard = await Cards.create(card).fetch();
    return res.ok(createCard);

  } catch (e) {
    // console.log("controllers/cards/create.js", "e", e, Object.keys(e));
    return res.badRequest(
      {},
      {
        message: `The card can't created: ${e.raw || e.details || e}`
      }
    );
  }
};
