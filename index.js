// loads .env property file.
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const core = require('./src/core');

// Functions
const getSuccessResponse = core.getSuccessResponse;
const getErrorResponse = core.getErrorResponse;
const getJwtToken = core.getJwtToken;

app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.redirect(301, '/login.html');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    /*
    db.fetchUser(username).then(function (user) {
      if (user.password == password) {
        getJwtToken(
            {username: username, ...user}
        ).then(tokenObj => {
          const localUsrObj = {...user}
          delete localUsrObj.password;
          return res.json(getSuccessResponse({
            user: {username: username, ...localUsrObj},
            ...tokenObj
          }))
        }).catch(error => {
          console.log(error.stack)
          return res.status(500).json(getErrorResponse(error.message));
        });
      } else {
        return res.status(401).json(getErrorResponse(`Incorrect username or password ${user.password}   ${password}`));
      }
    }).catch(function (error) {
      console.log(error.message)
      return res.status(500).json(
          getErrorResponse(error.message));
    });
     */
  } else {
    return res.status(400).json(getErrorResponse('Missing username or password'));
  }
});


/******************************/
app.listen(port, () => {
  console.log(`qlinks running on ${port}!`)
});
