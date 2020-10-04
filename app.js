// loads .env property file.
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const apiRoute = require('./src/api-router');
const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());

app.get(['/', '/login', '/home', '/logout', '/fe/*'], (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/@:short_name', (req, res) => {
    let short_name = req.params['short_name'];
    res.redirect(`https://www.google.com/search?q=${short_name}`);
});

app.use('/api', apiRoute);

/******************************/
app.listen(port, () => {
    console.log(`qlinks running on ${port}!`)
});
