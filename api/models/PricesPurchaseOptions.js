/**
 * PricesPurchaseOptions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    attributes: {
        label: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 150
        },
        sku: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 150
        },
        description: {
            type: 'string',
            required: true,
            minLength: 2
        },
        deleted: {
            type: 'boolean',
            defaultsTo: false
        },
        idPrice: {
            model: 'Prices'
        }
    }
};
