import React from 'react'
import Dashboard from '../dashboard'
import { bindActionCreators } from '../../../node_modules/redux';
import { connect } from 'react-redux'
import { getQuestions } from '../../modules/actions/questions'

class MostRecent extends React.Component {
  componentWillMount() {
    this.props.getQuestions()
  }

  render() {
    return (
      <div>
        <Dashboard title={"Most Recent Questions"} questionData={this.props.data}/>
      </div>
    )
  }
}

const mapStateToProps = ({question}) => {
  return {
    data: question.data,
    busy: question.busy,
    error: question.error
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getQuestions
    },
    dispatch
  )

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MostRecent)

