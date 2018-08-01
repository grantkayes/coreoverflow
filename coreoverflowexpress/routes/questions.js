var express = require('express');
var AWS = require('aws-sdk');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
var router = express.Router();
var moment = require('moment');

AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000',
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
    FilterExpression.push('#' + key + ' = ' + ':' + key);
  }

  return {
    TableName,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    FilterExpression: FilterExpression.join(' AND ')
  };
}

<<<<<<< HEAD
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
=======
function createUpdateQuestionParams(id, query) {
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

//Get all questions [DONE]
>>>>>>> 48cc258551193f0243e0ef072b02bcecd9b57f84
router.get('/', function(req, res, next) {
  var params = {
    TableName: 'Question',
    ProjectionExpression:
      '#id, #questionTitle, #claps, #body, #user, #userEmail, #timestamp, #answerCount, #answers',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#questionTitle': 'questionTitle',
      '#claps': 'claps',
      '#body': 'body',
      '#user': 'user',
      '#userEmail': 'userEmail',
      '#timestamp': 'timestamp',
      '#answerCount': 'answerCount',
      '#answers': 'answers'
    }
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      console.error(
        'Unable to scan the table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Scan succeeded.");
      res.status(200).send(data)
    }
  });
});

// Get all questions for a specific userId [DONE]
router.get('/:userEmail', function(req, res, next) {
  let params = createGetQuestionsParams({ userEmail: req.params.userEmail });

  docClient.scan(params, function(err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      res.status(200).send(data.Items);
    }
  });
});

<<<<<<< HEAD
router.post('/', function(req, res, next){
  console.log(req.body.userEmail);
  console.log(req.body.title);
=======
// To post a question [DONE]
router.post('/', function(req, res, next){
>>>>>>> 48cc258551193f0243e0ef072b02bcecd9b57f84
  const fields = {
    userEmail: req.body.userEmail,
    questionTitle: req.body.title,
    up: 0,
    down: 0,
    body: req.body.body,
    timestamp: moment().format('YYYY-MM-DDTHH:mm'),
    answerCount: 0,
<<<<<<< HEAD
    user: req.body.user
  };
  const params = createUpdateAnswersParams(uuidv4(), fields);
  docClient.update(params, function(err, data) {
    if (err) {
        console.log("no");
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        res.status(200).send(data)
    }
});
=======
    user: req.body.user,
    answers: {},
  };

  const params = createUpdateQuestionParams(uuidv4(), fields);
  docClient.update(params, function(err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.status(200).send(data)
    }
  })
>>>>>>> 48cc258551193f0243e0ef072b02bcecd9b57f84
})

// To delete a specific question [DONE]
router.delete('/:questionId', function(req, res, next) {
  console.log('within DELETE endpoint');
  var params = {
    TableName: 'Question',
    Key: { id: req.params.questionId }
  };

  docClient.delete(params, function(err, data) {
    if (err) {
      console.error(
        'Unable to delete item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
    }
  });
});

// Update a specific question [DONE]
router.patch('/:questionId', function(req, res, next) {
  console.log('within PATCH endpoint');

  var params = {
    TableName: "Question",
    Key:{ "id": req.params.questionId },
    UpdateExpression: "set questionTitle = :t, body = :b",
    ExpressionAttributeValues:{
        ":t": req.body.title,
        ":b": req.body.text
    },
    ReturnValues:"UPDATED_NEW"
  };

  docClient.update(params, function(err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
})

module.exports = router;
