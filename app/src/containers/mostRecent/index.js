import React from 'react'
import Dashboard from '../dashboard'
import axios from 'axios'

class MostRecent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionData: [],
      title: ''
    }
  }

  componentDidMount() {
    // Get all questions by default (TODO: Most recently sorted)
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
    return (
      <div>
        <Dashboard title={this.state.title} questionData={this.state.questionData}/>
      </div>
    )
  }
}

export default MostRecent