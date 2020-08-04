module.exports = {
  friendlyName: 'Send sms',
  description: 'Send sms to validate the user´s phone',
  inputs: {
    phone: {
      type: 'string',
      required: true
    },
    language: {
      type: 'string',
      required: true
    },
    idObject: {
      type: 'string',
      required: true
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    let success = true;

    // Generar codigo de verificación
    let code = '';
    let chars = 'ABCDEFGHIJKLMNPQRTUVWXYZ123456789';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Guardar el código de verificación
    const dataCode = {
      idObject: inputs.idObject,
      objectType: 'phone',
      code: code,
      expired: 0
    };

    await VerificationCodes.create(dataCode);

    // Crear objeto con la información que se enviara al SMS
    const dataSms = {
      to: [inputs.phone],
      template: 'Verification phone',
      vars: {
        code: code
      }
    };

    // Enviar SMS
    const response = await request({
      method: 'POST',
      json: true,
      uri: sails.config.custom.notifications.url + 'sms/', // NOSONAR
      form: dataSms,
      headers: {
        app: sails.config.custom.app,
        version: sails.config.custom.version,
        id: global.callId,
        language: inputs.language
      }
    });
    if (response.hasOwnProperty('error')) {
      success = false;
    }
    return exits.success(success);
  }
};
