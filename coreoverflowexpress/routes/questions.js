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

//Get all questions
router.get('/', function(req, res, next){
  var params = {
    TableName: "Question",
    ProjectionExpression: "#id, #questionTitle, #up, #body, #down, #user, #userId, #timestamp, #answerCount",
    ExpressionAttributeNames: {
      "#id": "id",
      "#questionTitle": "questionTitle",
      "#up": "up",
      "#body": "body",
      "#down": "down",
      "#user": "user",
      "#userId": "userId",
      "#timestamp": "timestamp",
      "#answerCount": "answerCount"
    }
  }

  docClient.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      // data.Items.forEach(function(question) {
      //   console.log(question.id, question.title, question.body)
      // });

      //TODO: Sort data by time stamp before returning
      res.status(200).send(data)
    }
  }
})

module.exports = router;
