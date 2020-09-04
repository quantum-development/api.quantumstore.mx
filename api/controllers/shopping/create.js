const validateJSON = value => {
  try {
    return JSON.parse(value);
  } catch (e) {
    e = false;
    return e;
  }
};
/**
 *  Create AddItems
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  let findData = {
    idUser: params.idUser,
    fingerprint: params.fingerPrint,
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
  let data = {};
  let item = await Items.findOne({
    id: req.item.id,
    deleted: false
  })
    .populate('prices')
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });

  const images = await ItemsImages.find({ idItem: item.id })
    .populate('idImage')
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });
  item.images = images.map(image => image.idImage);
  item.images = item.images.filter(image => image.deleted === false);

  const imageItem = item.images.length
    ? item.images.map(image => image.src)
    : [];
  const purchaseOption = params.purchase_option || null;

  let priceData = await item.prices.find(price => price.price === params.price);
  if (!priceData) {
    return res.notFound(
      {},
      {
        message: `The item price doesn't exists`
      }
    );
  }
  priceData = priceData || {};
  price = priceData.price || 0;
  priceData.promo_id = priceData.promo_id || 0;

  if (shopingData) {
    const dataCart = shopingData.data;
    let dataCartJson = validateJSON(dataCart);
    let items = dataCartJson.items;
    let itemIndex = items.findIndex(
      item =>
        item.id === req.item.id &&
        item.price === price &&
        item.purchaseOptions === purchaseOption
    );
    if (item) {
      if (itemIndex > -1) {
        let itemData = items[itemIndex];
        const amount = params.amount;
        const total = price * amount;
        itemData = {
          ...itemData,
          total,
          amount,
          price
        };
        items[itemIndex] = itemData;
        dataCartJson.items = items;
        data = dataCartJson;
      } else {
        const amount = params.amount;
        const total = price * amount;
        items.push({
          id: req.item.id,
          price,
          amount,
          total,
          name: item.name,
          priceLabel: priceData.label,
          digital_id: priceData.digital_id,
          promo_id: priceData.promo_id,
          purchaseOptions: purchaseOption,
          image: imageItem,
          imgThumbnail: item.imgThumbnail
        });
        dataCartJson.items = items;
        data = dataCartJson;
      }
    }
  } else {
    const createShopping = {
      ...findData,
      data: JSON.stringify({ items: [] }),
      total: 0
    };
    shopingData = await ShoppingCart.create(createShopping)
      .fetch()
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    const amount = params.amount;
    const total = price * amount;
    let items = [];
    items.push({
      id: item.id,
      price,
      amount,
      total,
      name: item.name,
      priceLabel: priceData.label,
      digital_id: priceData.digital_id,
      promo_id: priceData.promo_id,
      purchaseOptions: purchaseOption,
      image: imageItem,
      imgThumbnail: item.imgThumbnail
    });
    data.items = items;
    shopingData.total = total;
  }

  const whereUpdate = {
    id: shopingData.id
  };

  let shoppingTotal = 0;
  if (data.items) {
    data.items.forEach(item => {
      shoppingTotal += item.total;
    });
  }

  data = JSON.stringify(data);

  const dataToUpdate = {
    total: shoppingTotal,
    data
  };

  let cartUpdate = await ShoppingCart.update(whereUpdate)
    .set(dataToUpdate)
    .fetch()
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });

  data = validateJSON(data);

  cartUpdate = cartUpdate[0];

  cartUpdate = {
    ...cartUpdate,
    data
  };
  return res.ok(cartUpdate);
};
