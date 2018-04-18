const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const app = express();

app.get('/scrape', function(req, res){

  url = "https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1080-ti/";
  function makeRequest() {
    request(url, function(error, response, html){
      if(!error){
          const $ = cheerio.load(html);
          
          let sale;

          $('.js-product-item').eq(0).filter(function(){


              const data = $(this);

              sale = data.children().eq(1).attr('class');

              console.log(sale);
              
              if(sale.includes("cta-preorder")){
                console.log('true')
              } else {
                console.log('false')

              }
          })
      }
    })
  }
  setInterval(makeRequest, 2000);
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;