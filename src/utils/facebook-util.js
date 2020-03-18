const axios = require('axios');

async function getAccessTokenFromCode(code) {
  const { data } = await axios.get('https://graph.facebook.com/v6.0/oauth/access_token?', {
    params: {
      client_id: 2599130253691800,
      client_secret: 'c2c6d6e0bbb8b7b1db3a92b382314663',
      redirect_uri: 'https://orcemais-server.herokuapp.com/auth/facebook/callback/',
      code,
    }
  })
  return data.access_token
};

async function getFacebookUserData(accessToken) {
  const { data } = await axios('https://graph.facebook.com/me', {
    params: {
      fields: ['id', 'email', 'first_name', 'last_name'].join(','),
      access_token: accessToken,
    }
  })
  return data;
};

module.exports = {getAccessTokenFromCode, getFacebookUserData}