var express = require('express');
var AWS = require('aws-sdk');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
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

function createUpdateAnswersParams(id, query) {
  const AttributeUpdates = {};
 
  for (key in query) {
    AttributeUpdates[key] = {
      Action: 'PUT',
      Value: query[key]
    };
  }
 
  return {
    TableName: 'Question',
    Key: { id: id.trim() },
    AttributeUpdates,
    ReturnValues: 'ALL_NEW'
  };
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

// Get all questions matching searchTerm
router.get('/search', function(req, res, next){
  console.log(req.query.searchTerm)

})

// Get all questions for a specific userId
router.get('/:userId', function(req, res, next){
  let params = createGetQuestionsParams({ userId: req.params.userId})
  
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
  console.log('hehexd', req.body);
  console.log(req.body.userEmail);
  const fields = {
    userEmail: req.body.userEmail,
    title: req.body.title,
    up: 0,
    down: 0,
    body: req.body.body,
    timestamp: moment().format('YYYY-MM-DDTHH:mm'),
    answerCount: 0,
    user: req.body.user
  };
  console.log('FUCK u', fields)
  const params = createUpdateAnswersParams(uuidv4(), fields);
  console.log('FuCK dynamo', params)
  docClient.update(params, function(err, data) {
    if (err) {
        console.log("no");
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        res.status(200).send(data)
    }
});
})

module.exports = router;
