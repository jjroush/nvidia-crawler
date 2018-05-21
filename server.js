const login = require('./config.js');
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const app = express();


app.get('/scrape', function(req, res){
  //target url
  url = "https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1080-ti/";

  function makeRequest() {
    request(url, function(error, response, html){
      if (!error){
          const $ = cheerio.load(html);
          
          let sale;

          $('.cta-preorder.mobile-top').eq(0).filter(function(){


              const data = $(this);

              sale = data.find('div').text();

              
              
              if(sale.includes("Add to Cart")){
                console.log('true');
                
                
                  // create reusable transporter object using the default SMTP transport
                  let transporter = nodemailer.createTransport({
                      host: 'smtp.gmail.com',
                      port: 587,
                      secure: false, // true for 465, false for other ports
                      auth: {
                          user: login.myUSER,
                          pass: login.myPASS 
                      }
                  });

                  // setup email data 
                  let mailOptions = {
                      from: '"Nvidia Crawler" <jacobroushmail@gmail.cpm>', // sender address
                      to: 'jacob@dimensionalvideo.com', // list of receivers
                      subject: 'Hello ✔', // Subject line
                      text: 'No GTX 1080 available', // plain text body
                      html: 'No GTX 1080 available' // html body
                  };

                  // send mail with defined transport object
                  transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                          return console.log(error);
                      }
                      console.log('Message sent: %s', info.messageId);
                    
                  });
               
            
              
              
              } else {
                console.log('false');

              }
          })
      }
    })
  }
  setInterval(makeRequest, 5000);
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;