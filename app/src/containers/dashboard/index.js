<<<<<<< HEAD
import React from 'react';
import './dashboard.css';
import QuestionCard from '../../components/questionCard';
import moment from 'moment';
import { EmptyState } from '@procore/core-react';
=======
import React from 'react'
import './dashboard.css'
import QuestionCard from '../../components/questionCard/index'
import moment from 'moment'
>>>>>>> 53abc6baacd1dcf57308c8dca0f0e35f2be514e5
import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      questionData: [],
      title: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/questions')
    .then( response => {
      this.setState({
        questionData: response.data.Items,
        title: this.props.title
      });
    })
    .catch( error => {
      console.log(error);
    })
  }

  render() {
    const allQuestions = this.state.questionData.map((question) => {
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

<<<<<<< HEAD
  return (
    <div id="dashboard">
      <h1 id="dashboard-header">{props.title}</h1>
      <div className="questions-wrapper">{allQuestions}</div>
    </div>
  );
};

export default Dashboard;
=======
    return (
      <div id='dashboard'>
        <h1 id='dashboard-header'>{this.state.title}</h1>
        <div className='questions-wrapper'>
          { allQuestions }
        </div>
      </div>
    );
  }
}

export default Dashboard
>>>>>>> 53abc6baacd1dcf57308c8dca0f0e35f2be514e5
