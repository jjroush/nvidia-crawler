const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/scrape', function(req, res){

  url = "https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1080-ti/";

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;