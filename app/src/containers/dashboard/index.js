import React from 'react'
import './dashboard.css'
import QuestionCard from '../../components/questionCard/index'
import Placeholder from './placeholder';
import moment from 'moment'
import LazyLoad from 'react-lazyload';

const Dashboard = props => {
  const allQuestions = props.questionData.map((question) => {
    const exampleQuestion = {
      title: question.questionTitle,
      body: question.body,
      up: question.up,
      down: question.down,
      timestamp: moment(question.timestamp),
      user: question.user, 
      userId: question.userId,
      answerCount: question.answerCount
    }

    return (
      <LazyLoad key={question.id} height={150} throttle={350} offset={[0, -200]} placeholder={<Placeholder />} >
        <QuestionCard key={question.id} question={exampleQuestion} />
      </LazyLoad > 
    )
  })

  return (
    <div id='dashboard'>
      <h1 id='dashboard-header'>{props.title}</h1>
      <div className='questions-wrapper'>
        { allQuestions }
      </div>
    </div>
  );
}

export default Dashboard;
