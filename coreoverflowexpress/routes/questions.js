var express = require('express');
var AWS = require('aws-sdk');
var uuidv4 = require('uuid/v4');
var router = express.Router();

AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: 'myfakeaccessid',
  secretAccessKey: 'secret'
});

var docClient = new AWS.DynamoDB.DocumentClient();

router.get('/', function(req, res, next){
  const EXAMPLE_QUESTION = {
    title: 'How can I prevent SQL injection in PHP?',
    body: "There's so much confusion and debate over what is welcoming and what is expected of users with the Code of Conduct changing. There's a fine line we step between being frank in our discourse and what others consider rude. As a site we don't want to tie our community in knots over what they can and cannot say.",
    up: 25,
    down: 2,
    timestamp: moment('2018-04-20'),
    user: 'Johnny Walker'
  }

  res.status(200).send()
})

router.post('/', function(req, res, next){
  console.log(req.body);
  
  res.send();
})




module.exports = router;
