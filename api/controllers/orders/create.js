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

  // Must check a verified email account
  if (!req.userInfo.emailVerificated) {
    return res.badRequest(
      {},
      {
        message: `A verified email is required`
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
      order.status = 'payed';

      await Orders.update({
        // NOSONAR
        id: order.id
      })
        .set({
          status: 'payed',
          openpay: JSON.stringify(charge)
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

      // send email with rewards
      for (const item of shopingData.data.items) {
        const userApi = await sails.helpers.qrewardsApi(
          item.digital_id, // digital_id,
          item.amount, // digital_limit,
          {
            name: [req.userInfo.name, req.userInfo.lastName].join(' '),
            email: req.userInfo.email,
            info: {
              userId: req.userInfo.id,
              orderId: order.id,
              orderUrl: sails.config.custom.app_info.web + 'order/' + order.id,
              itemName: item.name,
              itemAmount: item.amount,
              priceLabel: item.priceLabel,
              purchaseOptions: item.purchaseOptions,
              imgThumbnail:
                sails.config.custom.app_info.web +
                'projects/qrewards' +
                item.imgThumbnail,
              userUsername: req.userInfo.username,
              phone: req.userInfo.phone
            }
          }, // data
          item.promo_id // promo_id
        );
      }
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
