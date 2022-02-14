const { default: config } = require('../config');

const client_id = config.api.clientId;
const client_secret = config.api.clientSecret

const credentials = {
  grant_type: 'client_credentials'
}

const params = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
  },
  body: new URLSearchParams(credentials)
}

export const fetchToken = async (setter) => {
  const response = await fetch(config.api.authUrl, params)
  const json = await response.json()

  if (response.ok) {
    if (json.access_token) {
      setter(json.access_token)
      return json.access_token
    } else {
      throw new Error('No access token')
    }
  } else {
    throw new Error('Error fetching token')
  }
}

export const TokenSingleton = (function () {
  let instance;

  async function createInstance() {
    const token = await fetchToken()

    if (!token) {
      throw new Error('unable to get token')
    }

    return token;
  }

  return {
    getInstance: async function () {
      if (!instance) {
        instance = await createInstance();
      }

      return instance;
    }
  };
})();