const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.send('I am just getting started..')
});

app.listen(port, () => {
  console.log(`qlinks running on ${port}!`)
});
