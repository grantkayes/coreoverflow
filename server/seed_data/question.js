var uuidv4 = require('uuid/v4');
var randomSentence = require('random-sentence');
var randomParagraph = require('random-paragraph');
var randomWords = require('random-words');
var moment = require('moment');

var users = [
  {
    name: 'Elton Xue',
    email: 'elton.xue@procore.com'
  },
  {
    name: 'Chanun Sumphanphaisal',
    email: 'chanun.sumphanphaisal@procore.com'
  },
  {
    name: 'Gregg Mcmillion',
    email: 'gregg.mcmillion@procore.com'
  },
  {
    name: 'Grant Kayes',
    email: 'grant.kayes@procore.com'
  }
];

function pickRandomUser(users) {
  return users[Math.floor(Math.random() * users.length)];
}

function pickRandomNumber(x) {
  return Math.floor(Math.random() * x + 1);
}

// function createRandomTags() {
//   var tags = [];
//   var randomTagNum = pickRandomNumber(5);
//   for (var x = 0; x < randomTagNum; x++) {
//     tags.push(randomWord());
//   }
//
//   return tags;
// }

function pickRandomDate() {
  var today = moment();

  return moment(today - Math.floor(Math.random() * 10000000000));
}

function pickRandomDateAfter(date) {
  return moment(date + Math.floor(Math.random() * 100000000));
}

function createAnswers(questionId, questionDate) {
  var ans = {};
  var ansCount = pickRandomNumber(30);

  for (var x = 0; x < ansCount; x++) {
    var ansId = uuidv4();

    var user = pickRandomUser(users);

    var firstName = user.name.substr(0, user.name.indexOf(' '));
    var lastName = user.name.substr(user.name.indexOf(' ') + 1);

    ans[ansId] = {
      firstName,
      lastName,
      questionId,
      userEmail: user.email,
      body: randomParagraph({ min: 2, max: 20 }),
      claps: pickRandomNumber(20),
      timestamp: pickRandomDateAfter(questionDate).format('YYYY-MM-DDTHH:mm')
    };
  }
  return ans;
}

function createQuestions(num) {
  var questionData = [];

  for (var x = 0; x < num - 1; x++) {
    var user = pickRandomUser(users);
    var questionId = uuidv4();
    var questionDate = pickRandomDate();

    var ans = createAnswers(questionId, questionDate);
    var ansCount = Object.keys(ans).length;

    var tags = randomWords({ min: 1, max: 5 });

    questionData.push({
      id: questionId,
      answerCount: ansCount,
      questionTitle: randomSentence({ min: 10, max: 25 }),
      claps: pickRandomNumber(20),
      body: randomParagraph({ min: 2, max: 20 }),
      user: user.name,
      userEmail: user.email,
      timestamp: questionDate.format('YYYY-MM-DDTHH:mm'),
      answers: ans,
      tags: tags
    });
  }
  return questionData;
}

module.exports = {
  name: 'Question',
  data: createQuestions(100)
};
