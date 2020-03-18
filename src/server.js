const express = require("express");
const {urlGoogle, createConnection} = require("./utils/google-util");
const {getAccessTokenFromCode, getFacebookUserData} = require("./utils/facebook-util");
const queryString = require('query-string');

const app = express();
const port = 3333;

app.get("/auth/google", async (req, res) => {
  const googleUrl = urlGoogle();
  return res.json({url: googleUrl})
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code
  const auth = createConnection();
  await auth.getToken(code, function (error, tokens) {
    if (error) {
      console.log(error);
    } else {
      auth.setCredentials(tokens);
    }
  });

  return res.redirect('orcemais://homepage');
})

app.get("/auth/facebook", (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: 2599130253691800,
    redirect_uri: 'https://orcemais-server.herokuapp.com/auth/facebook/callback/',
    scope: ['email', 'user_friends'].join(','),
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  });

  const facebookLoginUrl = `https://www.facebook.com/v6.0/dialog/oauth?${stringifiedParams}`
  return res.json({url: facebookLoginUrl})
})

app.get("/auth/facebook/callback", async (req, res) => {
  const code = req.query.code;
  const accessToken = await getAccessTokenFromCode(code)
  const user = await getFacebookUserData(accessToken);

  if (user) {
    res.redirect('orcemais://homepage')
  }
  
})

app.listen(process.env.PORT || port);
