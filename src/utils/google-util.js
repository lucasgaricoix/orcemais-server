const {google} = require('googleapis');

const googleConfig = {
  clientId:
    "147445577998-rkg9in54ehfdfodtbnvhod9pmppv9qrr.apps.googleusercontent.com",
  clientSecret: "1r2v0Bg_04ms5w76dspQF46a",
  redirect: "https://orcemais-server.herokuapp.com/auth/google/callback",
};

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email"
];

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}

module.exports = {urlGoogle, createConnection}
