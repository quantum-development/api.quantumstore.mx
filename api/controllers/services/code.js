const { URLSearchParams } = require('url');
const fetch = require("node-fetch");
/**
 * Este metodo checa el codigo
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  try {

    const { code } = req.allParams();
    const {
      name,
      lastName,
      email,
      street,
      district,
      city,
      codpost,
    } = req.userInfo;

    const params = new URLSearchParams({
      name: [name, lastName].join(" "),
      conditions: true
    });
    // info params
    params.append("info[firstname]", name);
    params.append("info[lastname]", lastName);
    params.append("info[email]", email);
    params.append("info[street]", street);
    params.append("info[district]", district);
    params.append("info[city]", city);
    params.append("info[cp]", codpost);

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const userData = params.toString()
      .replace(/%5B/g, "[").replace(/%5D/g, "]");

    const request = await fetch(`https://api.qrewards.mx/sites/store/auth/${code}?${userData}`, requestOptions);
    const { data, error } = await request.json();

    if ('description' in error) {
      throw error.description;
    }

    return res.ok(data);

  } catch (e) {
    return res.badRequest(
      {},
      {
        message: `${e}`
      }
    );
  }
};
