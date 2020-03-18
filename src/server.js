const express = require("express");
const {urlGoogle, createConnection} = require("./utils/google-util");

const app = express();
const port = 3333;

app.get("/auth", async (req, res) => {
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

app.listen(process.env.PORT || port);
