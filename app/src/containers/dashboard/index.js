import React from 'react'
import './dashboard.css'
import QuestionCard from '../../components/questionCard/index'
import moment from 'moment'
import { Pagination } from '@procore/core-react'

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
    return <QuestionCard key={question.id} question={exampleQuestion} />
  })

  return (
    <div id='dashboard'>
      <h1 id='dashboard-header'>{props.title}</h1>
      <div className='questions-wrapper'>
        { allQuestions }
        <div className='pagination'>
          <Pagination>
            <Pagination.Prev />
            <Pagination.Page >1</Pagination.Page>
            <Pagination.Page>2</Pagination.Page>
            <Pagination.Page variant="selected">3</Pagination.Page>
            <Pagination.Next variant="disabled" />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
