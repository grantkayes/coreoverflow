import React from 'react'
import './dashboard.css'
import QuestionCard from '../../components/questionCard/index'
import Placeholder from './placeholder';
import moment from 'moment'
import LazyLoad from 'react-lazyload';

const Dashboard = props => {
  const allQuestions = props.questionData.map((question) => {
    const exampleQuestion = {
      id: question.id,
      title: question.questionTitle,
      body: question.body,
      claps: question.claps,
      timestamp: moment(question.timestamp),
      user: question.user,
      userId: question.userId,
      answerCount: question.answerCount,
      tags: question.tags
    }

    return (
      <LazyLoad key={question.id} height={150} offset={[-100, -200]} placeholder={<Placeholder />} >
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
