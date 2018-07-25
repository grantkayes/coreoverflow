import React from 'react'
import './dashboard.css'
import { EmptyState } from '@procore/core-react'

const Dashboard = props => {
  let tempVarForIfEmptyQuestions = false;
  const allQuestions = tempVarForIfEmptyQuestions ? 
      "TODO: DISPLAY MULTIPLE QUESTION COMPONENTS" : (
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