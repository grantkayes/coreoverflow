var express = require('express');
var moment = require('moment');
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

router.post('/', function(req, res, next) {
  if (req.body.questionId === undefined || req.body.questionId === null || req.body.questionId.trim() === '' ) {
    res.status(400).send();
    return;
  }
  if (req.body.userId === undefined || req.body.userId === null || req.body.userId.trim() === '' ) {
    res.status(400).send();
    return;
  }
  //body is optional but should still be a
  if (req.body.body === undefined || req.body.body === null) {
    res.status(400).send();
    return;
  }

  const params = {
    TableName: 'Answer',
    Item: {
      id: uuidv4(),
      questionId: req.body.questionId.trim(),
      userId: req.body.userId.trim(),
      up: 0,
      down: 0,
      body: req.body.body,
      timestamp: moment().format('YYYY-MM-DDTHH:mm')
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add Answer:", JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    }

    console.log("PUT ANSWER SUCCEEDED:", data)
  })

  res.status(200).send()

});


module.exports = router;
