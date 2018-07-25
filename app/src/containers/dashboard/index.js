import React from 'react'
import './dashboard.css'
import QuestionCard from '../../components/QuestionCard'
import moment from 'moment'
import { EmptyState } from '@procore/core-react'

const EXAMPLE_QUESTION = {
  title: 'How can I prevent SQL injection in PHP?',
  body: "There's so much confusion and debate over what is welcoming and what is expected of users with the Code of Conduct changing. There's a fine line we step between being frank in our discourse and what others consider rude. As a site we don't want to tie our community in knots over what they can and cannot say.",
  up: 25,
  down: 2,
  timestamp: moment('2018-04-20'),
  user: 'Johnny Walker'
}

const EXAMPLE_ANS_COUNT = 2080;

const Dashboard = props => {
  let tempVarForIfEmptyQuestions = true;

  const allQuestions = tempVarForIfEmptyQuestions ? (
      <div>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
        <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
      </div>
    ) : (
      <EmptyState>
        <EmptyState.Image><img src="" alt='empty state img'/></EmptyState.Image>
        <EmptyState.Title>Sorry, No Questions Available</EmptyState.Title>
        <EmptyState.Description>Feel free to search for questions or ask a question</EmptyState.Description>
      </EmptyState>
    )

  return (
    <div id='dashboard'>
      <h1 id='dashboard-header'>{props.title}</h1>
      <div className='questions-wrapper'>
        { allQuestions }
      </div>
    </div>
  )
}


export default Dashboard