import React from 'react'
import './dashboard.css'
import QuestionCard from '../../components/QuestionCard'
import moment from 'moment'
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