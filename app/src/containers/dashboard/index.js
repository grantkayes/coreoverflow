<<<<<<< HEAD
import React from 'react'
import './dashboard.css'
import QuestionCard from '../../components/QuestionCard'
import moment from 'moment'
import axios from 'axios'
import { EmptyState } from '@procore/core-react'
=======
import React from 'react';
import './dashboard.css';
import QuestionCard from '../../components/questionCard';
import moment from 'moment';
import { EmptyState } from '@procore/core-react';
>>>>>>> 550d90cf141199e8b32b8078197ee1bf3c106f87

const EXAMPLE_QUESTION = {
  title: 'How can I prevent SQL injection in PHP?',
  body:
    "There's so much confusion and debate over what is welcoming and what is expected of users with the Code of Conduct changing. There's a fine line we step between being frank in our discourse and what others consider rude. As a site we don't want to tie our community in knots over what they can and cannot say.",
  up: 25,
  down: 2,
  timestamp: moment('2018-04-20'),
  user: 'Johnny Walker'
};

const EXAMPLE_ANS_COUNT = 2080;

const Dashboard = props => {
  let tempVarForIfEmptyQuestions = true;
  console.log('before axios call')
  axios.get('http://localhost:5000/questions')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })

  const allQuestions = tempVarForIfEmptyQuestions ? (
    <div>
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
      <QuestionCard
        question={EXAMPLE_QUESTION}
        answerCount={EXAMPLE_ANS_COUNT}
      />
    </div>
  ) : (
    <EmptyState>
      <EmptyState.Image>
        <img src="" alt="empty state img" />
      </EmptyState.Image>
      <EmptyState.Title>Sorry, No Questions Available</EmptyState.Title>
      <EmptyState.Description>
        Feel free to search for questions or ask a question
      </EmptyState.Description>
    </EmptyState>
  );

  return (
    <div id="dashboard">
      <h1 id="dashboard-header">{props.title}</h1>
      <div className="questions-wrapper">{allQuestions}</div>
    </div>
<<<<<<< HEAD
  )
}

export default Dashboard
=======
  );
};

export default Dashboard;
>>>>>>> 550d90cf141199e8b32b8078197ee1bf3c106f87
