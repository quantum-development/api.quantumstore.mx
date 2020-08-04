/**
 * updateLockState
 *
 * @module      :: Helper
 * @description :: Simple helper to update lock state
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */

const moment = require('moment');

const LOCK_INTERVAL_SEC = 120;
const LOCK_TRY_COUNT = 5;

module.exports = {
  friendlyName: 'Update lock state',

  description: '',

  inputs: {
    user: {
      type: 'ref',
      required: true
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    const now = moment().utc();
    let prevFailure = null;
    let passwordFailures = inputs.user.passwordFailures;
    let locked = false;
    if (inputs.user.lastPasswordFailure) {
      prevFailure = moment(inputs.user.lastPasswordFailure);
    }
    if (
      prevFailure !== null &&
      now.diff(prevFailure, 'seconds') < LOCK_INTERVAL_SEC
    ) {
      passwordFailures += 1;

      // lock if this is the 4th incorrect attempt
      if (passwordFailures >= LOCK_TRY_COUNT) {
        locked = true;
      }
    } else {
      // reset the failed attempts
      passwordFailures = 1;
    }

    // prettier-ignore
    await Users.update({// NOSONAR
      id: inputs.user.id
    }).set({
      locked: locked,
      passwordFailures: passwordFailures,
      lastPasswordFailure: now.toDate(),
      resetToken: ''
    }).intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });

    // All done.
    return exits.success();
  }
};
