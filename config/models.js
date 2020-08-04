/**
 * Default model settings
 * (sails.config.models)
 *
 * Your default, project-wide model settings. Can also be overridden on a
 * per-model basis by setting a top-level properties in the model definition.
 *
 * For details about all available model settings, see:
 * https://sailsjs.com/config/models
 *
 * For more general background on Sails model settings, and how to configure
 * them on a project-wide or per-model basis, see:
 * https://sailsjs.com/docs/concepts/models-and-orm/model-settings
 */

module.exports.models = {
  schema: false,
  attributes: {
    createdAt: {
      type: 'string',
      columnType: 'datetime',
      autoCreatedAt: true
    },
    updatedAt: {
      type: 'string',
      columnType: 'datetime',
      autoUpdatedAt: true
    },
    id: { type: 'number', autoIncrement: true }
  },
  dataEncryptionKeys: {
    default: 'a8YjTvh59NKot1m9KeuM9bR3PNLjRXFaNQCRvgyX6lQ='
  },
  cascadeOnDestroy: false
};
