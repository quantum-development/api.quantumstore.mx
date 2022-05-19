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

    // Must check a verified email account
    if (!req.userInfo.emailVerificated) {
        return res.badRequest({}, {
            message: `A verified email is required`
        });
    }

    try {
        // Get Card
        const cardData = await Cards.findOne({
            id: orderData.cardId,
            deleted: false
        });
        if (!cardData) {
            return res.notFound({}, {
                message: `The card was not found`
            });
        }

        // Get Shipping Cart
        const shopingData = await ShoppingCart.findOne(findData);
        if (!shopingData) {
            return res.notFound({}, {
                message: `The shopping cart doesn't exists`
            });
        }
        // console.log("controllers/orders/create.js", "shopingData", shopingData);

        const { items } = JSON.parse(shopingData.data);
        const { total: subtotal, total, id: idShoppingCart } = shopingData;

        // Create Order
        const newOrder = {
            subtotal,
            total,
            idUser: orderData.idUser,
            social: orderData.social,
            rfc: orderData.rfc,
            idShoppingCart
        };
        const createOrder = await Orders.create(newOrder)
            .fetch();
        if (!createOrder) {
            return res.notFound({}, {
                message: `The order can't created`
            });
        }

        const shopingItems = items.map(async (item) => {
            const {
                id,
                name,
                digital_id,
                price,
                priceLabel,
                purchaseOptions,
                imgThumbnail,
                promo_id
            } = item;
            const orderItem = await OrdersItems.create({
                idOrder: createOrder.id,
                idItem: id,
                amount,
                price
            }).fetch();
            return {
                name,
                ...orderItem,
                digital_id,
                promo_id,
                priceLabel,
                purchaseOptions,
                imgThumbnail,
            };
        });

        const chargeData = {
            source_id: cardData.cardId,
            method: 'card',
            amount: total,
            currency: 'MXN',
            description: `Cargo referente a orden ${createOrder.id}`,
            order_id: `${createOrder.id}`,
            device_session_id: orderData.deviceSesionId
        };
        const charge = await sails.helpers.openpayCharges(
            req.customer.customerId,
            chargeData,
            'charge'
        );
        // console.log("controllers/orders/create.js", "charge OpenPay", charge);

        // send email with rewards
        for (const item of shopingItems) {
            console.log("controllers/orders/create.js", "item sending", item);
            const userApi = await sails.helpers.qrewardsApi(
                item.digital_id, // digital_id,
                item.amount, // digital_limit,
                {
                    name: [req.userInfo.name, req.userInfo.lastName].join(' '),
                    email: req.userInfo.email,
                    info: {
                        userId: req.userInfo.id,
                        orderId: createOrder.id,
                        orderUrl: sails.config.custom.app_info.web + 'order/' + createOrder.id,
                        itemName: item.name,
                        itemAmount: item.amount,
                        priceLabel: item.priceLabel,
                        purchaseOptions: item.purchaseOptions,
                        imgThumbnail: sails.config.custom.app_info.web +
                            'projects/qrewards' +
                            item.imgThumbnail,
                        userUsername: req.userInfo.username,
                        phone: req.userInfo.phone
                    }
                }, // data
                item.promo_id // promo_id
            );

            await OrdersItems.update({
                // NOSONAR
                id: item.id
            }).set({
                qrewards: JSON.stringify(userApi)
            });

            // if (userApi) { // Has ike coupon
            //     const digital = userApi.rewards[0].digital.name;
            //     const rewards = userApi.rewards[0];

            //     if (digital.indexOf('IKE') >= 0) {
            //         for (const stock of rewards.stock) {
            //             let data = {
            //                 code: stock.exit_code.code,
            //                 start_date: rewards.promo.starts,
            //                 end_date: rewards.promo.ends,
            //                 user: rewards.record.name,
            //                 program: rewards.digital.description.program ? rewards.digital.description.program : '',
            //                 account_ike: rewards.digital.description.account ? rewards.digital.description.account : '',
            //             }

            //             // console.log('DATA IKE: ', data);
            //             const ikeApi = await sails.helpers.ikeApi({
            //                 "Movimiento_IKE": "2",
            //                 "Cuenta_IKE": data.account_ike,
            //                 "Nombre": data.user,
            //                 "Fecha Inicio": data.start_date,
            //                 "Fecha Fin": data.end_date,
            //                 "No de Folio": data.code,
            //                 "Programa": data.program
            //             });
            //         }

            //     }
            // }
        }

        const updatedOrder = await Orders.update({
            // NOSONAR
            id: createOrder.id
        })
            .set({
                status: 'payed',
                openpay: JSON.stringify(charge)
            })
            .fetch();

        await ShoppingCart.update({
            // NOSONAR
            id: shopingData.id
        })
            .set({ finished: true })
            .fetch();

        return res.ok({
            message: 'El pago se realizo correctamente',
            success: true,
            ...updatedOrder
        });

    } catch (e) {
        // console.log("controllers/cards/create.js", "e", e, Object.keys(e));
        const error_message = `${e.raw || e.details || e}`;
        return res.badRequest(
            {},
            {
                message: `The order can't created: ${error_message}`
            }
        );
    }
};