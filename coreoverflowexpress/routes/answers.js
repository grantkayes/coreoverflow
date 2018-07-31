var express = require('express');
var moment = require('moment');
var AWS = require('aws-sdk');
var uuidv4 = require('uuid/v4');
const { WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

var router = express.Router();


function sendSlackNotification(email, title, id) {
  web.users.lookupByEmail({ email })
    .then((res) => {
      const userId = res.user.id
      web.im.open({
        token: process.env.SLACK_BOT_TOKEN,
        user: userId,
        return_im: true,
      })
      .then((res) => {
        web.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel: res.channel.id,
          text: `:wave: Hey! Your question has been answered!`,
          attachments: [
            {
              title,
              title_link: `http://localhost:3000/question/${id}`,
            }
          ]
        })
          .then((res) => {
        // `res` contains information about the posted message
          console.log('Message sent: ', res.ts);
        })
          .catch(console.error);
      })
    })
}

function createGetAnswerParams(query) {
  if (Object.keys(query).length === 0) {
    return {};
  }

  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};
  const FilterExpression = [];

  for (key in query) {
    ExpressionAttributeNames['#' + key] = key;
    ExpressionAttributeValues[':' + key] = query[key];
    FilterExpression.push('#' + key + ' = ' + ':' + key);
  }

  return {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    FilterExpression: FilterExpression.join(' AND ')
  };
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
    TableName: 'Answer',
    Key: { id: id.trim() },
    AttributeUpdates,
    ReturnValues: 'ALL_NEW'
  };
}

AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'myfakeaccessid',
  secretAccessKey: 'secret'
});

var docClient = new AWS.DynamoDB.DocumentClient();

router.post('/', function(req, res, next) {
  if (
    req.body.questionId === undefined ||
    req.body.questionId === null ||
    req.body.questionId.trim() === ''
  ) {
    res.status(400).send();
    return;
  }
  if (
    req.body.userEmail === undefined ||
    req.body.userEmail === null ||
    req.body.userEmail.trim() === ''
  ) {
    res.status(400).send();
    return;
  }
  //body is optional but should still be a
  if (req.body.body === undefined || req.body.body === null) {
    res.status(400).send();
    return;
  }

  const fields = {
    questionId: req.body.questionId.trim(),
    userEmail: req.body.userEmail.trim(),
    claps: 0,
    body: req.body.body,
    timestamp: moment().format('YYYY-MM-DDTHH:mm')
  };
  const params = createUpdateAnswersParams(uuidv4(), fields);

  docClient.update(params, function(err, data) {
    if (err) {
      console.error('Unable to add Answer:', JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    }

    const questionParams = {
      TableName: 'Question',
      Key: { id: req.body.questionId.trim() },
      AttributeUpdates: {
        answerCount: {
          Action: 'ADD',
          Value: 1
        }
      },
      ReturnValues: 'ALL_NEW'
    };

    docClient.update(questionParams, function(err, questionData) {
      if (err) {
        console.error(
          'Unable to update Question:',
          JSON.stringify(err, null, 2)
        );
        res.status(500).send();
        return;
      }
      const question = questionData.Attributes;
      sendSlackNotification(question.userEmail, question.questionTitle, question.id);
      res.status(200).json({
        data: data.Attributes
      });
    });
  });
});

router.get('/', function(req, res, next) {
  console.log('zhag');
  let params = createGetAnswerParams(req.query);
  params.TableName = 'Answer';

  docClient.scan(params, function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    console.log(data);
    console.log('success');
    res.status(200).json({
      data: data.Items
    });
  });
});

router.get('/:id', function(req, res, next) {
  console.log('bob');
  const params = {
    TableName: 'Answer',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ExpressionAttributeValues: {
      ':id': req.params.id
    }
  };

  docClient.query(params, function(err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
      res.status(500).send();
    } else {
      console.log('Query succeeded.');
      res.send({
        data: data.Items
      });
      return;
    }
  });
});

router.patch('/:id', function(req, res, next) {
  if (
    req.params.id === undefined ||
    req.params.id === null ||
    req.params.id.trim() === ''
  ) {
    res.status(400).send('PATCH ANSWER: Missing Id');
    return;
  }
  const params = createUpdateAnswersParams(req.params.id, req.body);

  docClient.update(params, function(err, data) {
    if (err) {
      console.error('Unable to update Answer:', JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    }

    console.log('update Answer', JSON.stringify(data, null, 2));
    res.status(200).json({
      data: data.Attributes
    });
  });
});

router.delete('/:id', function(req, res, next) {
  if (
    req.params.id === undefined ||
    req.params.id === null ||
    req.params.id.trim() === ''
  ) {
    res.status(400).send('PATCH ANSWER: Missing Id');
    return;
  }

  const params = {
    TableName: 'Answer',
    Key: {
      id: req.params.id.trim()
    }
  };

  docClient.delete(params, function(err, data) {
    if (err) {
      console.error('Unable to delete Answer:', JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    }

    res.status(200).send();
  });
});

module.exports = router;
