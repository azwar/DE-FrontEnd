import axios from "axios";
const { default: config } = require('../config');

export const apiClient = (token) => {
  console.log('token', token)

  return axios.create({
    baseURL: config.api.baseUrl,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

export default apiClient