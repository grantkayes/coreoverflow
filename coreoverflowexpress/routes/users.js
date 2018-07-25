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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  var params = {
        TableName: "User",
        Item: {
            "id": uuidv4(),
            "first_name": "chanun",
            "last_name": "sumphanphaisal",
            "email": 'bgp@gmail.com',
            "slack_handle": '@csumphan'
        }
    };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add User:", JSON.stringify(err, null, 2));
    }
    else {
      console.log("PUTITEM succeed:", data)
    }
  });

  res.status(200).send()

});

module.exports = router;
