let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');

request('https://toysrus.co.il/all-products.html?limit=32&no_cache=1&p=1&price=-150', (err, resp, html) => {
        if (!err){
          const $ = cheerio.load(html);
          console.log(Array.from($('.swatchProdImg')).map(obj => obj.attribs.src))
      }
});

// var request = require('request');
// var cheerio = require('cheerio');

// request('http://www.google.com/', function(err, resp, html) {
//         if (!err){
//           const $ = cheerio.load(html);
//           console.log(html); 
//       }
// });