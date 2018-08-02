var express = require('express');
var AWS = require('aws-sdk');
var uuidv4 = require('uuid/v4');
var router = express.Router();

require('dotenv').config();

AWS.config.update({
  region: process.env.DYNAMO_REGION,

  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

var docClient = new AWS.DynamoDB.DocumentClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  var params = {
    TableName: 'User',
    Item: {
      id: uuidv4(),
      first_name: 'chanun',
      last_name: 'sumphanphaisal',
      email: 'bgp@gmail.com',
      slack_handle: '@csumphan'
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Unable to add User:', JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    } else {
      console.log('PUT ANSWER SUCCEEDED:', data);
    }
  });

  res.status(200).send();
});

module.exports = router;
