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
    .catch((err) => {
      console.error('User not found in slack')
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

// UpdateExpression: `SET #answers = list_append(if_not_exists(#answers, :empty_list), :newAnswer)`,
// "ExpressionAttributeNames" : {
//   "#answers" : "answers"
// },
// ExpressionAttributeValues:{
//     ":newAnswer": [query],
//     ":empty_list":[]
// },

// UpdateExpression = "SET map.#number = :string"
// ExpressionAttributeNames = { "#number" : "1" }
// ExpressionAttributeValues = { ":string" : "the string to store in the map at key value 1" }
// ConditionExpression = "attribute_not_exists(map.#number)"

function createPostAnswersParams(questionId, id, query) {
  return {
    TableName: 'Question',
    Key: { id: questionId.trim() },
    UpdateExpression: "SET answers.#answerId = :answer, answerCount = answerCount + :count",
    ExpressionAttributeNames: { "#answerId" : id.trim() },
    ExpressionAttributeValues: { ":answer" : query, ':count': 1 },
    ConditionExpression: "attribute_not_exists(answers.#answerId)",
    ReturnValues: 'ALL_NEW'
  };
}

function createUpdateAnswersParams(questionId, id, query) {
  let UpdateExpression = []
  let ExpressionAttributeNames = { "#answerId": id.trim() };
  let ExpressionAttributeValues = {};

  for (key in query) {
    UpdateExpression.push(`answers.#answerId.#${key} = :${key}`);
    ExpressionAttributeNames[`#${key}`] = key;
    ExpressionAttributeValues[`:${key}`] = query[key];
  }

  UpdateExpression = 'SET ' + UpdateExpression.join(',');
  console.log(UpdateExpression);
  return {
    TableName: 'Question',
    Key: { id: questionId.trim() },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ConditionExpression: "attribute_exists(answers.#answerId)",
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
  if (req.body.questionId === undefined || req.body.questionId === null || req.body.questionId.trim() === '') {
    res.status(400).send();
    return;
  }
  if (req.body.userEmail === undefined || req.body.userEmail === null || req.body.userEmail.trim() === '') {
    res.status(400).send();
    return;
  }
  if (req.body.firstName === undefined || req.body.firstName === null || req.body.firstName.trim() === '') {
    res.status(400).send();
    return;
  }
  if (req.body.lastName === undefined || req.body.lastName === null || req.body.lastName.trim() === '') {
    res.status(400).send();
    return;
  }
  //body is optional but should still be a
  if (req.body.body === undefined || req.body.body === null) {
    res.status(400).send('body field missing');
    return;
  }

  const fields = {
    questionId: req.body.questionId.trim(),
    userEmail: req.body.userEmail.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    claps: 0,
    body: req.body.body,
    timestamp: moment().format('YYYY-MM-DDTHH:mm')
  };

  const answerId = uuidv4();
  const params = createPostAnswersParams(req.body.questionId, answerId, fields);

  docClient.update(params, function(err, data) {
    if (err) {
      console.error('Unable to add Answer:', JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    }

    const question = data.Attributes;
    const answer = {
      id: answerId,
      ...question.answers[answerId]
    }
    sendSlackNotification(question.userEmail, question.questionTitle, question.id);
    res.status(200).json({
      data: answer
    });
  });
});

// router.get('/', function(req, res, next) {
//   console.log('zhag');
//   let params = createGetAnswerParams(req.query);
//   params.TableName = 'Answer';
//
//   docClient.scan(params, function(err, data) {
//     if (err) {
//       console.log(err);
//       res.status(500).send();
//       return;
//     }
//     console.log(data);
//     console.log('success');
//     res.status(200).json({
//       data: data.Items
//     });
//   });
// });
//
router.get('/', function(req, res, next) {
  if (req.query.questionId === undefined || req.query.questionId === null || req.query.questionId.trim() === '') {
    res.status(400).send();
    return;
  }

  const params = {
    TableName: 'Question',
    Key: {
      id: req.query.questionId.trim()
    }
  };

  docClient.get(params, function(err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
      res.status(500).send();
    } else {
      const listData = []

      if (data.Item) {
        for (key in data.Item.answers) {
          const answerObj = data.Item.answers[key]
          answerObj.id = key;
          listData.push(answerObj);
        }
      }

      res.send({
        data: listData
      });
      return;
    }
  });
});

router.patch('/:id', function(req, res, next) {
  if (req.params.id === undefined || req.params.id === null || req.params.id.trim() === '') {
    res.status(400).send('PATCH ANSWER: Missing id');
    return;
  }
  if (req.body.questionId === undefined || req.body.questionId === null || req.body.questionId.trim() === '') {
    res.status(400).send();
    return;
  }
  const params = createUpdateAnswersParams(req.body.questionId.trim(), req.params.id, req.body);

  docClient.update(params, function(err, data) {
    if (err) {
      console.error('Unable to update Answer:', JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    }
    const id = req.params.id.trim()
    const answer = {
      id,
      ...data.Attributes.answers[id]
    }

    console.log('data:', data.Attributes)
    console.log('new data:', answer)
    res.status(200).json({
      data: answer
    });
  });
});

router.delete('/:id', function(req, res, next) {
  if (req.params.id === undefined || req.params.id === null || req.params.id.trim() === '') {
    res.status(400).send('PATCH ANSWER: Missing Id');
    return;
  }

  if (req.body.questionId === undefined || req.body.questionId === null || req.body.questionId.trim() === '') {
    res.status(400).send('PATCH ANSWER: Missing Question Id');
    return;
  }

  const params = {
    TableName: 'Question',
    Key: {
      id: req.body.questionId.trim()
    },
    UpdateExpression: `REMOVE answers.#answerId`,
    ExpressionAttributeNames: { "#answerId" : req.params.id.trim() },
  };

  docClient.update(params, function(err, data) {
    if (err) {
      console.error('Unable to delete Answer:', JSON.stringify(err, null, 2));
      res.status(500).send();
      return;
    }

    res.status(200).send();
  });
});

module.exports = router;
