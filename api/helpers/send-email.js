module.exports = {
  friendlyName: 'Send email',
  description: 'Send email to different situation',
  inputs: {
    accion: {
      type: 'string',
      required: true
    },
    data: {
      type: 'json',
      required: true
    },
    headers: {
      type: 'json',
      required: true
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    let success = true;
    const response = await request({
      method: 'POST',
      json: true,
      uri: `${sails.config.custom.notifications.url}${inputs.accion}`, // NOSONAR
      form: inputs.data,
      headers: inputs.headers
    });
    if (response.hasOwnProperty('error')) {
      success = false;
    }
    return exits.success(success);
  }
};
