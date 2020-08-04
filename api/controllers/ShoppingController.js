const validateJSON = value => {
  try {
    return JSON.parse(value);
  } catch (e) {
    e = false;
    return e;
  }
};

/**
 * ShoppingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findCart: async (req, res) => {
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
    return res.ok(shopingData);
  },
  setCart: async (req, res) => {
    const params = req.allParams();
    let findData = {
      idUser: null,
      fingerprint: params.fingerPrint,
      deleted: false,
      finished: false
    };

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
    findData.idUser = req.userInfo.id;
    //Get Shipping Cart

    const shopingDataActive = await ShoppingCart.findOne(findData).intercept(
      _err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      }
    );

    if (shopingDataActive) {
      await ShoppingCart.update(findData)
        .set({
          deleted: true
        })
        .fetch()
        .intercept(_err => {
          return res.badRequest(
            {},
            {
              message: `There an error on DB`
            }
          );
        });
    }

    const whereUpdate = {
      id: shopingData.id
    };

    const dataToUpdate = {
      idUser: req.userInfo.id
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

    cartUpdate = cartUpdate[0];
    let data = validateJSON(cartUpdate.data);

    cartUpdate = {
      ...cartUpdate,
      data
    };
    return res.ok(cartUpdate);
  }
};
