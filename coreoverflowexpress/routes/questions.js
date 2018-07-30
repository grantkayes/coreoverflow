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

function createGetQuestionsParams(query) {
  if (Object.keys(query).length === 0) {
    return {};
  }

  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};
  const FilterExpression = [];
  const TableName = 'Question';

  for (key in query) {
    ExpressionAttributeNames['#' + key] = key;
    ExpressionAttributeValues[':' + key] = query[key];
    FilterExpression.push('#' + key + " = " + ':' + key);
  }

  return {
    TableName,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    FilterExpression: FilterExpression.join(' AND '),
  }
}

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

  docClient.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      //TODO: Sort data by time stamp before returning
      res.status(200).send(data)
    }
  })
})

// Get all questions for a specific userId
router.get('/:userEmail', function(req, res, next){
  let params = createGetQuestionsParams({ userEmail: req.params.userEmail})

  docClient.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      res.status(200).send(data.Items)
    }
  })
})

router.post('/', function(req, res, next){
  console.log(req.body);
  
  res.send();
})

// To delete a specific question
/*
router.delete('/:questionId', function(req, res, next){
  var params = {
    TableName: "Question",
    Key:{ "id": req.params.questionId }
  };
  
  docClient.delete(params, function(err, data) {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
})
*/

module.exports = router;
