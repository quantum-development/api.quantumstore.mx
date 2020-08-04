/**
 * validateTypeField
 *
 * @module      :: Helper
 * @description :: Simple helper to validate type field
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
module.exports = {
  friendlyName: 'Validate field',
  description: 'Validate if field is valid',
  inputs: {
    body: {
      type: 'json',
      description: 'fields',
      required: true
    },
    idField: {
      type: 'string',
      description: 'find this id on body to set value',
      required: true
    },
    value: {
      type: 'string',
      description: 'Value to set',
      required: true
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    let res = {
      success: false,
      msg: 'Something bad happened on the request.'
    };
    async.map(inputs.body, async item => {
      if (item.id === inputs.idField) {
        res.success = true;
        switch (item.type) {
          case 'number':
            if (!_.isNumber(Number(inputs.value))) {
              res.success = false;
            }
            break;
          case 'datetime':
            let dateCheck = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;
            let dateTest = dateCheck.test(inputs.value.toString());
            if (!dateTest) {
              res.success = false;
            }
            break;
          case 'boolean':
            if (!_.isBoolean(inputs.value)) {
              res.success = false;
            }
            break;
          case 'checkbox':
          case 'radio':
          case 'select':
            if (!_.contains(item.options.split('|'), inputs.value.toString())) {
              res.success = false;
            }
        }
        if (!res.success) {
          res.msg = 'The value to set in field isn´t valid';
        }
      }
    });
    return exits.success(res);
  }
};
