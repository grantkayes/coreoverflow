import React from 'react'
import Dashboard from '../dashboard'
import axios from 'axios'

//TODO: Remove hard coded userId
const USER_ID = 2

class MyQuestions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      questionData: [],
      title: ''
    }
  }

  componentDidMount() {
    // Get all my questions associated with my userId
    axios.get(`http://localhost:5000/questions/${USER_ID}`)
    .then( response => {
      this.setState({ questionData: response.data });
    })
    .catch( error => {
      console.log(error);
    })
  }

  render() {
    return (
      <Dashboard title={this.state.title} questionData={this.state.questionData}/>
    )
  }
}

export default MyQuestions
