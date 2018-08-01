import React from 'react'
import Dashboard from '../dashboard'
import { bindActionCreators } from '../../../node_modules/redux'
import { connect } from 'react-redux'
import { getMyQuestions } from '../../modules/actions/questions'
import { EmptyState } from '@procore/core-react'

class MyQuestions extends React.Component {
  componentWillMount() {
    this.props.getMyQuestions(this.props.user)
  }

  render() {
    return (this.props.data.length === 0) ? (
      <div>
        <EmptyState>
          <EmptyState.Image><img src="http://coreoverflow.s3.amazonaws.com/1/5c2398eb-488d-47ec-8b5b-8202a79aca19" alt='empty state img'/></EmptyState.Image>
          <EmptyState.Title>Sorry, you have no questions</EmptyState.Title>
          <EmptyState.Description>Please try using 'Post a Question' in the side bar</EmptyState.Description>
        </EmptyState>        
      </div>
    ) : (
      <div>
        <Dashboard title={"My Questions:"} questionData={this.props.data}/>
      </div>
    )
  }
}

const mapStateToProps = ({question, user}) => {
  return {
    data: question.data,
    busy: question.busy,
    user: user.data,
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
