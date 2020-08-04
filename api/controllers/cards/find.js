/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const cardData = {
    customerId: req.customer.customerId
  };
  const cards = await sails.helpers.openpayCards(cardData, 'find');

  const dataCards = {
    customerId: req.customer.customerId,
    cards: cards
  };

  return res.ok(dataCards);
};
