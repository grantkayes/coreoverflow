import React from 'react'
import Dashboard from '../dashboard'
import { bindActionCreators } from '../../../node_modules/redux'
import { connect } from 'react-redux'
import { getMyQuestions } from '../../modules/actions/questions'

class MyQuestions extends React.Component {
  componentWillMount() {
    this.props.getMyQuestions()
  }

  render() {
    return (
      <div>
        <Dashboard title={"My Questions"} questionData={this.props.data}/>
      </div>
    )
  }
}

const mapStateToProps = ({ question }) => {
  return {
    data: question.data,
    busy: question.busy,
    error: question.error
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMyQuestions
    },
    dispatch
  )

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MyQuestions)
