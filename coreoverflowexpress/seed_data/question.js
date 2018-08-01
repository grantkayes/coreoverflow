var uuidv4 = require('uuid/v4');
var randomSentence = require('random-sentence');
var randomParagraph = require('random-paragraph');

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

function pickRandomNumber() {
  return Math.floor(Math.random() * 9 + 1);
}

function createQuestions(num) {
  var questionData = [
    {
      id: '1',
      answerCount: 4,
      questionTitle: 'How do I make this work?',
      claps: 5,
      body:
        'I am not sure what to do to make this work. The issue arise when I do this.',
      user: 'Elton Xue',
      userEmail: 'elton.xue@procore.com',
      timestamp: '2018-07-27T14:21',
      answers: {}
    }
  ];

  for (var x = 0; x < num - 1; x++) {
    var user = pickRandomUser(users);

    questionData.push({
      id: uuidv4(),
      answerCount: 4,
      questionTitle: randomSentence({ min: 10, max: 25 }),
      claps: 5,
      body: randomParagraph({ min: 1, max: 20 }),
      user: user.name,
      userEmail: user.email,
      timestamp: '2018-07-27T14:21',
      answers: {}
    });
  }
  return questionData;
}

module.exports = {
  name: 'Question',
  data: createQuestions(100)
};
