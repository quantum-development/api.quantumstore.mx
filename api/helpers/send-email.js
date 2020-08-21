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
    let success = false;
    try {
      success = request.post(
        {
          json: true,
          url: `${sails.config.custom.email_provider.url}${inputs.accion}`, // NOSONAR
          form: inputs.data,
          headers: inputs.headers
        },
        function(error, response, body) {
          if (body.success !== undefined && !body.success) {
            return true;
          }
          return false;
        }
      );
    } catch (error) {
      console.error('Error send-email', error);
      success = false;
    }
    return exits.success(success);
  }
};
