/**
 * Items.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 150
    },
    description: {
      type: 'string',
      required: false,
      allowNull: true
    },
    external_purchase: {
      type: 'string',
      required: false,
      allowNull: true
    },
    imgThumbnail: {
      type: 'string',
      allowNull: true
    },
    sort: {
      type: 'number',
      defaultsTo: 0
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    },
    images: {
      collection: 'ItemsImages',
      via: 'idItem'
    },
    categories: {
      collection: 'CategoriesItems',
      via: 'idItem'
    },
    prices: {
      collection: 'Prices',
      via: 'idItem'
    }
  }
};
