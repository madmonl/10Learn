const path = require('path');
const express = require('express');
const request = require('request')
const cheerio = require('cheerio')
const axios = require('axios')
const cors = require('cors')
var fs = require('fs');
const inspect = require('util').inspect;

var util = require('util')
const CircularJSON = require('circular-json');

const app = express();

app.use(cors())

const port = process.env.PORT || 3000;

app.get('/shop-items/*', (req, res) => {
    request(req.originalUrl.split('').slice(12).join(''), (err, _res, html) => {
      res.send(util.inspect(html))
    })
});

app.listen(port, () => {
  console.log('Server is up!');
});
