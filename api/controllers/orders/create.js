const validateJSON = value => {
  try {
    return JSON.parse(value);
  } catch (e) {
    e = false;
    return e;
  }
};

/**
 *  Create order
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const orderData = {
    rfc: params.rfc,
    social: params.social,
    deviceSesionId: params.deviceSesionId,
    cardId: params.cardId,
    idUser: req.userInfo.id,
    fingerprint: params.fingerprint
  };

  let findData = {
    idUser: orderData.idUser,
    fingerprint: orderData.fingerprint,
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
  if (!shopingData) {
    return res.notFound(
      {},
      {
        message: `The shopping cart doesn't exists`
      }
    );
  }
  const data = validateJSON(shopingData.data);
  shopingData = {
    ...shopingData,
    data
  };

  // Create Order
  const orderCreate = {
    subtotal: shopingData.total,
    total: shopingData.total,
    idUser: orderData.idUser,
    social: orderData.social,
    rfc: orderData.rfc,
    idShoppingCart: shopingData.id
  };

  let order = await Orders.create(orderCreate)
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();

  if (!order) {
    return res.notFound(
      {},
      {
        message: `The order can't created`
      }
    );
  }

  for (const item of shopingData.data.items) {
    await OrdersItems.create({
      idOrder: order.id,
      idItem: item.id,
      amount: item.amount,
      price: item.price
    }).intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });
  }

  //Get Card
  const cardData = await Cards.findOne({
    id: orderData.cardId,
    deleted: false
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  if (cardData) {
    const chargeData = {
      source_id: cardData.cardId,
      method: 'card',
      amount: shopingData.total,
      currency: 'MXN',
      description: `Cargo referente a orden ${order.id}`,
      order_id: `${order.id}`,
      device_session_id: orderData.deviceSesionId
    };
    const charge = await sails.helpers.openpayCharges(
      req.customer.customerId,
      chargeData,
      'charge'
    );

    order.message = 'No se realizo el cargo correctamente';
    order.success = false;
    if (charge) {
      order.message = 'El pago se realizo correctamente';
      order.success = true;
      await Orders.update({
        // NOSONAR
        id: order.id
      })
        .set({ status: 'payed' })
        .intercept(_err => {
          return res.badRequest(
            {},
            {
              message: `There an error on DB`
            }
          );
        })
        .fetch();
    }
  }

  await ShoppingCart.update({
    // NOSONAR
    id: shopingData.id
  })
    .set({ finished: true })
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();

  return res.ok(order);
};