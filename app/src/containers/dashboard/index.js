import React from 'react';
import './dashboard.css';
import QuestionCard from '../../components/questionCard';
import moment from 'moment';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: [],
      title: ''
    };
  }

  // componentDidMount() {
  //   axios
  //     .get('http://localhost:5000/questions')
  //     .then(response => {
  //       this.setState({
  //         questionData: response.data.Items,
  //         title: this.props.title
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    // const allQuestions = this.state.questionData.map((question) => {
    //   const exampleQuestion = {
    //     title: question.questionTitle,
    //     body: question.body,
    //     up: question.up,
    //     down: question.down,
    //     timestamp: moment(question.timestamp),
    //     user: question.user,
    //     userId: question.userId,
    //     answerCount: question.answerCount
    //   }

    //   return <QuestionCard key={question.id} question={exampleQuestion} />
    // })

    const allQuestions = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(count => {
      const EXAMPLE_QUESTION = {
        title: 'How can I prevent SQL injection in PHP?',
        body:
          "There's so much confusion and debate over what is welcoming and what is expected of users with the Code of Conduct changing. There's a fine line we step between being frank in our discourse and what others consider rude. As a site we don't want to tie our community in knots over what they can and cannot say.",
        up: 25,
        down: 2,
        timestamp: moment('2018-04-20'),
        user: 'Johnny Walker',
        answerCount: 2080
      };

      return <QuestionCard question={EXAMPLE_QUESTION} />;
    });

    return (
      <div id="dashboard">
        <h1 id="dashboard-header">{this.state.title}</h1>
        <div className="questions-wrapper">{allQuestions}</div>
      </div>
    );
  }
}

export default Dashboard;
